import { Logger } from '../utils/logger';
import { AppConfig } from './app.config';
import * as swaggerUi from 'swagger-ui-express';
import * as lowdb from 'lowdb';
import express from 'express';
import jsonServer = require('json-server');
import { StorageAdapter } from '../storage/storage';
import { ApiSpecification } from '../specifications/apispecification';
import { JSONValidator } from '../validations/json.validator';
import { Output } from '../utils/output';
import graphqlHTTP from 'express-graphql';
import { createSchema } from 'swagger-to-graphql';
import cors from 'cors';
import { GraphQLMethods } from '../utils/grapqhl_callback';
import { GraphQLSchema } from 'graphql';
import { Environment } from '../environment';
import bodyParser from 'body-parser';

export class CoreApp {
  storageAdapter: StorageAdapter;
  static storage = {} as lowdb.AdapterAsync;
  static adapter = {} as lowdb.LowdbAsync<{}>;
  static swaggerSpec = null;
  private isValid = false;
  swaggerMiddleware: express.RequestHandler = null;
  appConfig: AppConfig;
  protected server: express.Express;
  private apispec: ApiSpecification;
  static graphqlSchema: GraphQLSchema = null;
  private environment: Environment;
  private url = '';
  constructor(
    appConfig: AppConfig,
    server: express.Express,
    storageAdapter: StorageAdapter,
    apispec: ApiSpecification,
    environment: Environment
  ) {
    this.appConfig = appConfig;
    this.server = server;
    this.storageAdapter = storageAdapter;
    this.apispec = apispec;
    this.environment = environment;
    Logger.getInstance().info(
      'environment: ' + JSON.stringify(this.environment)
    );
  }

  async setup(): Promise<void> {
    this.setupMiddleware();
    CoreApp.adapter = await this.setupStorage(this.storageAdapter);
    const json = await this.getJSON(CoreApp.adapter);
    if (!this.isValid) this.isValid = this.validateJSON(json);
    if (this.isValid) {
      const { middlewares, router } = await this.initializeLayers();
      await this.setupRoutes(json, middlewares, router);
    } else {
      Output.setError('provided json is not valid - see validation checks');
      throw Error('provided json is not valid - see validation checks');
    }
  }

  private setupMiddleware() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
  }

  protected async setupStorage(
    storageAdapter: StorageAdapter
  ): Promise<lowdb.LowdbAsync<any>> {
    CoreApp.storage = storageAdapter.init();
    const adapter = await lowdb.default(CoreApp.storage);
    return adapter;
  }

  protected validateJSON(db: {}): boolean {
    let isValid = true;
    if (this.appConfig.enableJSONValidation) {
      isValid = JSONValidator.validate(db);
    }
    return isValid;
  }

  protected async getJSON(adapter: lowdb.LowdbAsync<any>): Promise<object> {
    const json = await adapter.getState();
    return json;
  }

  protected async setupRoutes(db: {}, middlewares, router): Promise<void> {
    middlewares.splice(
      middlewares.findIndex(x => x.name === 'serveStatic'),
      1
    );
    this.server.use(middlewares);
    this.server.use('/api', router);
    if (!CoreApp.swaggerSpec) {
      CoreApp.swaggerSpec = this.apispec.generateSpecification(db, true);

      CoreApp.graphqlSchema = await createSchema({
        swaggerSchema: CoreApp.swaggerSpec,
        callBackend: args => {
          return GraphQLMethods.callRestBackend({
            requestOptions: {
              path: args.requestOptions.path,
              method: args.requestOptions.method,
              bodyType: args.requestOptions.bodyType,
            },
            context: args.context,
          });
        },
      });

      this.server.post('/graphql', (req, res) => {
        const graphqlFunc = graphqlHTTP({
          schema: CoreApp.graphqlSchema,
          graphiql: false,
          context:
            this.environment.basePath == '/'
              ? req.headers['origin']
              : req.headers['origin'] + this.environment.basePath,
        });
        return graphqlFunc(req, res);
      });

      this.server.get('/graphql', (req, res) => {
        const graphqlFunc = graphqlHTTP({
          schema: CoreApp.graphqlSchema,
          graphiql: true,
        });
        return graphqlFunc(req, res);
      });

      this.server.use('/api-spec', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(CoreApp.swaggerSpec);
      });
      this.server.use('/ui', swaggerUi.serveWithOptions({ redirect: false }));
      this.server.use('/', swaggerUi.serveWithOptions({ redirect: false }));
      this.server.get('/ui', swaggerUi.setup(CoreApp.swaggerSpec));
    }
  }

  protected async initializeLayers() {
    if (
      CoreApp.adapter &&
      Object.entries(CoreApp.adapter).length === 0 &&
      CoreApp.adapter.constructor === Object
    ) {
      CoreApp.adapter = await lowdb.default(CoreApp.storage);
    }

    const router = jsonServer.router(CoreApp.adapter);
    const middlewares = jsonServer.defaults({
      readOnly: this.appConfig.readOnly,
    });
    return { middlewares, router };
  }
}

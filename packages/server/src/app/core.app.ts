import { Logger } from '../utils/logger';
import { AppConfig, LogLevel } from './app.config';
import swaggerUi from 'swagger-ui-express';
import * as lowdb from 'lowdb';
import express from 'express';
import jsonServer = require('json-server');
import { StorageAdapter } from '../storage/storage';
import { ApiSpecification } from '../specifications/apispecification';
import { JSONValidator } from '../validations/json.validator';
import { graphqlHTTP } from 'express-graphql';
import { createSchema } from 'swagger-to-graphql';
import cors from 'cors';
import { GraphQLMethods } from '../utils/grapqhl_callback';
import { GraphQLSchema } from 'graphql';
import { Environment } from '../environment';
import { Output } from '../utils/output';
import { ValidationResult } from '../validations/validationresult';
import helmet from 'helmet';
import { AuthStrategy } from '../auth/auth.strategy';

export class CoreApp {
  private storageAdapter: StorageAdapter;
  private storage = {} as lowdb.AdapterAsync;
  private adapter = {} as lowdb.LowdbAsync<{}>;
  private swaggerSpec = null;
  private appConfig: AppConfig;
  protected server: express.Express;
  private apispec: ApiSpecification;
  private graphqlSchema: GraphQLSchema = null;
  private environment: Environment;
  private authStrategy: AuthStrategy;
  constructor(
    appConfig: AppConfig,
    server: express.Express,
    storageAdapter: StorageAdapter,
    apispec: ApiSpecification,
    environment: Environment,
    authStrategy: AuthStrategy
  ) {
    this.appConfig = appConfig;
    this.server = server;
    this.storageAdapter = storageAdapter;
    this.apispec = apispec;
    this.environment = environment;
    this.authStrategy = authStrategy;
    Logger.init(appConfig.logLevel);
    Output.setDebugInfo('environment: ' + JSON.stringify(this.environment));
  }

  async setup(): Promise<void> {
    this.setupAuthentication();
    this.setupMiddleware();

    this.adapter = await this.setupStorage(this.storageAdapter);
    const json = await this.adapter.getState();
    if (this.validateJSON(json)) {
      const { middlewares, router } = this.initializeLayers();

      await this.setupRoutes(json, middlewares, router, this.appConfig);
    } else {
      Output.setError(
        'provided json is not valid - please solve the mentioned issues first to go ahead'
      );
      throw Error(
        'provided json is not valid - please solve the mentioned issues first'
      );
    }
  }

  private setupAuthentication() {
    if (this.appConfig.enableApiKeyAuth) {
      this.authStrategy.init();
    }
  }

  private setupMiddleware() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  protected async setupStorage(
    storageAdapter: StorageAdapter
  ): Promise<lowdb.LowdbAsync<object>> {
    this.storage = storageAdapter.init();
    const adapter = await lowdb.default(this.storage);
    return adapter;
  }

  protected validateJSON(db: {}): boolean {
    let validationResult = new ValidationResult();
    if (this.appConfig.enableJSONValidation) {
      validationResult = JSONValidator.validate(
        db,
        this.appConfig.enableSwagger
      );
      if (
        !validationResult.isValid ||
        this.appConfig.logLevel === LogLevel.debug
      ) {
        Output.printValidationReport(validationResult);
      }
    }
    return validationResult.isValid;
  }

  protected async setupRoutes(
    db: {},
    middlewares,
    router,
    appConfig: AppConfig
  ): Promise<void> {
    middlewares.splice(
      middlewares.findIndex(x => x.name === 'serveStatic'),
      1
    );
    this.server.use(middlewares);
    this.server.use(appConfig.routes.apiRoutePath, router);
    if (!this.swaggerSpec && appConfig.enableSwagger) {
      this.swaggerSpec = this.apispec.generateSpecification(db, true);
      const swaggerSetupMiddleware = swaggerUi.setup(this.swaggerSpec);
      const req: any = {};
      const res: any = { send: () => {} };
      swaggerSetupMiddleware(req, res, () => (err: object): void => {
        console.log(err);
      });
      this.graphqlSchema = await createSchema({
        swaggerSchema: this.swaggerSpec,
        callBackend: async args => {
          const graphqlRequest = args.context['req'];
          const httpProtocol = graphqlRequest
            .get('host')
            .startsWith('localhost')
            ? 'http'
            : graphqlRequest.protocol;
          return GraphQLMethods.callRestBackend({
            requestOptions: {
              bodyType: args.requestOptions.bodyType,
              method: args.requestOptions.method,
              path: args.requestOptions.path,
              baseUrl:
                this.environment.basePath === '/'
                  ? httpProtocol + '://' + graphqlRequest.get('host')
                  : httpProtocol +
                    '://' +
                    graphqlRequest.get('host') +
                    this.environment.basePath,
              body:
                args.requestOptions.method === 'get'
                  ? ''
                  : args.requestOptions.body,
              headers: graphqlRequest.headers,
              query: graphqlRequest.query,
            },
            context: graphqlRequest,
          });
        },
      });

      this.server.use(appConfig.routes.graphqlRoutePath, (req, res) => {
        const graphqlFunc = graphqlHTTP({
          schema: this.graphqlSchema,
          graphiql: { headerEditorEnabled: true },
          context: {
            req,
          },
        });
        return graphqlFunc(req, res);
      });

      this.server.use(appConfig.routes.swaggerSpecRoutePath, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(this.swaggerSpec);
      });

      this.server.use(
        appConfig.routes.swaggerUIRoutePath,
        swaggerUi.serveWithOptions({ redirect: false })
      );
      this.server.use('/', swaggerUi.serveWithOptions({ redirect: false }));
      this.server.get(
        appConfig.routes.swaggerUIRoutePath,
        swaggerUi.setup(this.swaggerSpec)
      );
    }
  }

  protected initializeLayers() {
    const router = jsonServer.router(this.adapter);
    const middlewares = jsonServer.defaults({
      readOnly: this.appConfig.readOnly,
    });
    return { middlewares, router };
  }
}

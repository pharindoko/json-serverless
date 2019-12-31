import { Logger } from '../utils/logger';
import { AppConfig } from './app.config';
import * as lowdb from 'lowdb';
import express from 'express';
import jsonServer = require('json-server');
import { StorageAdapter } from '../storage/storage';
import { ApiSpecification } from '../specifications/apispecification';
import { JSONValidator } from '../validations/json.validator';
import { Output } from '../utils/output';

export class CoreApp {
  storageAdapter: StorageAdapter;
  static storage = {} as lowdb.AdapterAsync;
  static adapter = {} as lowdb.LowdbAsync<{}>;
  private prettyPrintLog = false;
  appConfig: AppConfig;
  protected server: express.Express;
  private apispec: ApiSpecification;

  constructor(
    appConfig: AppConfig,
    server: express.Express,
    storageAdapter: StorageAdapter,
    apispec: ApiSpecification,
    prettyPrintLog = false
  ) {
    this.appConfig = appConfig;
    this.server = server;
    this.storageAdapter = storageAdapter;
    this.apispec = apispec;
    this.prettyPrintLog = prettyPrintLog;
    Logger.init(this.prettyPrintLog);
  }

  async setup(): Promise<void> {
    await this.setupStorage();
    const json = await this.getJSON();
    const isValid = this.validateJSON(json);
    if (isValid) {
      await this.setupApp();
      this.setupSwagger(json);
      await this.setupRoutes();
    } else {
      Output.setError('provided json is not valid - see validation checks');
      throw Error('provided json is not valid - see validation checks');
    }
  }

  protected async setupStorage() {
    CoreApp.storage = await this.storageAdapter.init();
    CoreApp.adapter = await lowdb.default(CoreApp.storage);
  }

  protected async setupApp(): Promise<void> {
    const { middlewares, router } = await this.initializeLayers();
    this.setupServer(middlewares, router);
  }

  protected validateJSON(db: {}): boolean {
    let isValid = true;
    if (this.appConfig.enableJSONValidation) {
      isValid = JSONValidator.validate(db);
    }
    return isValid;
  }

  protected async getJSON(): Promise<object> {
    const json = await CoreApp.adapter.getState();
    return json;
  }

  protected setupSwagger(db: {}): void {
    if (this.appConfig.enableSwagger) {
      this.apispec.generateSpecification(db, true);
    }
  }

  protected setupRoutes(): void {
    this.server.use('/reload', async () => {
      Error('not implemented');
    });
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

  protected setupServer(
    middlewares: express.Handler[],
    router: express.Router
  ) {
    if (this.appConfig.enableSwagger) {
      middlewares.splice(
        middlewares.findIndex(x => x.name === 'serveStatic'),
        1
      );
    }
    this.server.use(middlewares);
    this.server.use('/api', router);
  }
}

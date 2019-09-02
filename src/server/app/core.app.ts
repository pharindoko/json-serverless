import { Logger } from '../utils/logger';
import { AppConfig } from './app.config';
import * as lowdb from 'lowdb';
import express from 'express';
import jsonServer = require('json-server');
import { StorageAdapter } from '../storage/storage';
import { ApiSpecification } from '../specifications/apispecification';
import { JSONValidator } from '../validations/json.validator';

export class CoreApp {
  storageAdapter: StorageAdapter;
  static storage = {} as lowdb.AdapterAsync;
  logger = new Logger().logger;
  appConfig: AppConfig;
  protected server: express.Express;
  private apispec: ApiSpecification;

  constructor(
    appConfig: AppConfig,
    server: express.Express,
    storageAdapter: StorageAdapter,
    apispec: ApiSpecification
  ) {
    this.appConfig = appConfig;
    this.server = server;
    this.storageAdapter = storageAdapter;
    this.apispec = apispec;
  }

  async setup(): Promise<void> {
    await this.setupStorage();
    const json = await this.setupApp();
    this.validateJSON(json);
    this.setupSwagger(json);
    await this.setupRoutes();
  }

  protected async setupStorage() {
    CoreApp.storage = await this.storageAdapter.init();
  }

  protected async setupApp(): Promise<object> {
    const { middlewares, router, adapter } = await this.initializeLayers();
    this.setupServer(middlewares, router);
    const json = await adapter.getState();
    return json;
  }

  protected validateJSON(db: {}): void {
    if (this.appConfig.enableSwagger) {
      const validator = JSONValidator.validate(db);
    }
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
    const adapter = await lowdb.default(CoreApp.storage);
    const router = jsonServer.router(adapter);
    const middlewares = jsonServer.defaults({
      readOnly: this.appConfig.readOnly,
    });
    return { middlewares, router, adapter };
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

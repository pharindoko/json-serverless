import { Logger } from '../logger';
import { AppConfig } from '../config';
import * as lowdb from 'lowdb';
import express from 'express';
import { Swagger } from '../swagger/swagger';
import jsonServer = require('json-server');
export abstract class CoreApp {
  static storage = {} as lowdb.AdapterAsync;
  logger = new Logger().logger;
  appConfig: AppConfig;
  protected server: express.Express;
  private swagger = new Swagger();

  constructor(appConfig: AppConfig, server: express.Express) {
    this.appConfig = appConfig;
    this.server = server;
  }

  async setup(): Promise<void> {
    this.logger.debug('setup');
    this.initEnvironmentVariables();
    await this.setupStorage();
    const json = await this.setupApp();
    await this.setupSwagger(json);
    await this.setupRoutes();
  }

  protected initEnvironmentVariables(): void {}
  abstract setupStorage(): Promise<void>;
  abstract setupApp(): Promise<object>;
  protected setupSwagger(db: {}): void {
    if (this.appConfig.enableSwagger) {
      this.swagger.generateSwagger(this.server, db, this.appConfig, true);
    }
  }

  protected setupRoutes(): void {
    this.server.use('/reload', async () => {
      Error('not implemented');
    });
  }

  protected async initializeLayers() {
    this.logger.info('initLayer: ' + JSON.stringify(CoreApp.storage));
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

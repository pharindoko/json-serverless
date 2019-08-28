import express from 'express';
import { Logger } from '../logger';
const logger = new Logger().logger;
import { CoreApp } from '../app/app';
export abstract class CoreServer {
  core: CoreApp;
  server: express.Express;
  constructor(server: express.Express, core: CoreApp) {
    this.server = server;
    this.core = core;
  }
  abstract async init(): Promise<void>;
  protected start(server: express.Express, port: number) {
    // start the web server
    server.listen(port);
    logger.info(
      `JSON Server is running under port ${port}. Use http://localhost:${port} to access it`
    );
  }
}

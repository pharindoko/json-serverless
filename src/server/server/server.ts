import express from 'express';
import { Logger } from '../logger';
const logger = new Logger().logger;

import { Core, CoreEngine } from '../core';
export abstract class Server {
  protected core: CoreEngine;
  server: express.Express;
  constructor(server: express.Express) {
    this.server = server;
    this.core = new Core(this.server);
  }
  abstract async init(): Promise<void>;
  start(server: express.Express, port: number) {
    // start the web server
    server.listen(port);
    logger.info(
      `JSON Server is running under port ${port}. Use http://localhost:${port} to access it`
    );
  }
}

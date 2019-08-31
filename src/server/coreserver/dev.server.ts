import { CoreServer } from './server';
import { CloudApp } from '../app';
import express from 'express';

export class DevServer extends CoreServer {
  core: CloudApp;
  constructor(server: express.Express, core: CloudApp) {
    super(server, core);
    this.server = server;
    this.core = core;
  }

  async init(): Promise<void> {
    await this.core.setup();
    await this.core.request();
    this.start(this.server, 3000);
  }
}

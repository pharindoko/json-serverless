import { CoreApp, CloudApp } from '../app';
import { CoreServer } from './server';
import express from 'express';

export class CloudServer extends CoreServer {
  core: CloudApp;
  constructor(server: express.Express, core: CloudApp) {
    super(server, core);
    this.server = server;
    this.core = core;
  }

  async init(): Promise<void> {
    await this.core.setup();
    await this.core.request();
  }
}

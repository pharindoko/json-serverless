import { CoreApp, CloudApp, DevApp } from '../app';
import { CoreServer } from './server';
import express from 'express';

export class OfflineServer extends CoreServer {
  core: DevApp;
  constructor(server: express.Express, core: DevApp) {
    super(server, core);
    this.server = server;
    this.core = core;
  }

  async init(): Promise<void> {
    await this.core.setup();
    await this.core.request();
  }
}

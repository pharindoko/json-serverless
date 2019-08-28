import express from 'express';
import {
  LocalServer,
  DevServer,
  CloudServer,
  TestServer,
  OfflineServer,
} from './coreserver';
import { LocalApp, DevApp, CloudApp } from './app';
import { AppConfig } from './config';
export class ServerFactory {
  static createServer = async (
    type: string,
    server: express.Express,
    appConfig: AppConfig
  ): Promise<void> => {
    switch (type) {
      case 'local': {
        await new LocalServer(server, new LocalApp(appConfig, server)).init();
        break;
      }
      case 'debug': {
        await new LocalServer(server, new LocalApp(appConfig, server)).init();
        break;
      }
      case 'development': {
        await new DevServer(server, new DevApp(appConfig, server)).init();
        break;
      }
      case 'offline': {
        await new OfflineServer(server, new DevApp(appConfig, server)).init();
        break;
      }
      case 'test': {
        await new TestServer(server, new LocalApp(appConfig, server)).init();
        break;
      }
      default: {
        await new CloudServer(server, new CloudApp(appConfig, server)).init();
        break;
      }
    }
  };
}

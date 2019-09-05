import express from 'express';
import { ServerFactory } from './factory';
import { AppConfig } from './app/app.config';

export const startServer = async (
  environment: string,
  server: express.Express,
  appConfig: AppConfig
) => {
  ServerFactory.createServer(environment, server, appConfig);
};

(async () => {
  if (require.main === module) {
    const server = express();
    const defaultConfig = new AppConfig();
    defaultConfig.jsonFile = '../../db.json';
    startServer(process.env.NODE_ENV as string, server, defaultConfig);
  }
})();

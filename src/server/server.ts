import express from 'express';
import { ServerFactory } from './factory';
import { AppConfig } from './app/app.config';
import fs from 'fs';

const server = express();
const defaultConfig = new AppConfig();
const config = JSON.parse(fs.readFileSync('./config/appconfig.json', 'UTF-8'));
const appConfig = AppConfig.merge(defaultConfig, config);

(async () => {
  if (require.main === module) {
    ServerFactory.createServer(
      process.env.NODE_ENV as string,
      server,
      appConfig
    );
  }
})();

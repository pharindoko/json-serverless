import { ServerFactory, AppConfig } from '../src/index';
import express from 'express';

const server = express();
const defaultConfig = new AppConfig();
defaultConfig.readOnly = false;
defaultConfig.jsonFile = 'db.json';
defaultConfig.enableSwagger = true;

const start = async () => {
  // do something
  await ServerFactory.createServer(
    'local',
    server,
    defaultConfig,
    '../package.json'
  );
};

start();

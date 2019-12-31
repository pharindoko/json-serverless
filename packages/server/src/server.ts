import express from 'express';
import { ServerFactory } from './factory';
import { AppConfig } from './app/app.config';

export const startServer = async (
  environment: string,
  server: express.Express,
  appConfig: AppConfig,
  packageJsonFilePath: string
) => {
  ServerFactory.createServer(
    environment,
    server,
    appConfig,
    packageJsonFilePath
  );
};

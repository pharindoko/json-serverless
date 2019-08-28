import { APIGatewayProxyHandler } from 'aws-lambda';
import express from 'express';
import serverlessHttp from 'serverless-http';
import { Core } from './core';
import { Logger } from './logger';
import { DevServer, CloudServer, LocalServer } from './server';
import { Server } from './server/server';
const logger = new Logger().logger;
const server = express();
const core = new Core(server);
const sls = serverlessHttp(server);

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  await core.request();
  const result = await sls(event, _context);
  return result;
};
(async () => {
  if (require.main === module) {
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'debug') {
      await new LocalServer(server).init();
    } else if (process.env.NODE_ENV === 'development') {
      await new DevServer(server).init();
    } else {
      await new CloudServer(server).init();
    }
  }
})();

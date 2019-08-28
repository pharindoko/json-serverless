import { APIGatewayProxyHandler } from 'aws-lambda';
import express from 'express';
import serverlessHttp from 'serverless-http';
import { Core } from './core';
import { Logger } from './logger';
const logger = new Logger().logger;
const server = express();
const core = new Core(server);
function start(server: express.Express, port: number) {
  // start the web server
  server.listen(port);
  logger.info(
    `JSON Server is running under port ${port}. Use http://localhost:${port} to access it`
  );
}

const sls = serverlessHttp(server);
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  await core.request();
  const result = await sls(event, _context);
  return result;
};
(async () => {
  await core.init();
  if (require.main === module) {
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'debug') {
      start(core.server, 3000);
    } else if (process.env.NODE_ENV === 'development') {
      await core.request();
      start(core.server, 3000);
    } else {
      await core.request();
    }
  }
})();

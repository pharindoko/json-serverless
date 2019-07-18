const fs = require('fs');
const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3');
const serverless = require('serverless-http');
const jsonServer = require('json-server');

const defaultDB = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const logger = require('pino')({
  prettyPrint: true,
}, process.stderr);

function startLocal() {
  const server = jsonServer.create();
  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(3000, () => {
    logger.info('JSON Server is running');
  });
}

function startInCloud() {
  logger.info(`S3FILE: ${process.env.S3FILE}`);
  logger.info(`S3BUCKET: ${process.env.S3BUCKET}`);
  logger.info(`READONLY: ${process.env.READONLY}`);
  const server = jsonServer.create();
  const storage = new AwsAdapter(process.env.S3FILE, {
    defaultValue: defaultDB,
    aws: { bucketName: process.env.S3BUCKET },
  });
  const start = (port) => {
    // start the web server
    server.listen(port, () => {
      logger.info(`JSON Server is running under port 3000. Use http://localhost:${port} to access it`);
    });
  };
  const request = async () => {
    try {
      const adapter = await low(storage);
      logger.info('storage initialized');
      const router = jsonServer.router(adapter);
      const middlewares = jsonServer.defaults({ readOnly: process.env.READONLY === 'true' });
      server.use(middlewares);
      server.use(router);
    } catch (e) {
      if (e.code === 'ExpiredToken') {
        logger.error(`Please add valid credentials for AWS. Error: ${e.message}`);
      } else {
        logger.error(e.code);
      }
    }
  };
  const handler = serverless(server);
  module.exports.handler = async (event, context) => {
    await request();
    const result = await handler(event, context);
    return result;
  };
  if (require.main === module) {
    request();
    start(3000);
  }
}
if (process.env.NODE_ENV === 'local') {
  startLocal();
} else if (process.env.NODE_ENV === 'diagnostic') {
  logger.info('load variables from .env file');
  // eslint-disable-next-line global-require
  require('dotenv').config();
  startInCloud();
} else {
  startInCloud();
}

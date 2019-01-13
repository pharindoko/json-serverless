'use strict';

const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3')
const serverless = require('serverless-http');
const jsonServer = require('json-server');
const logger = require('pino')({
  prettyPrint: true
}, process.stderr);
if (process.env.NODE_ENV === 'local') {
  logger.info('load variables from .env file');
  require('dotenv').load();
}

console.log(process.env.LOGLEVEL);

logger.info('S3FILE: ' + process.env.S3FILE);
logger.info('S3BUCKET: ' + process.env.S3BUCKET);
logger.info('READONLY: ' + process.env.READONLY);
const server = jsonServer.create();
const storage = new AwsAdapter(process.env.S3FILE, { defaultValue: { "basic": { "hello": "world" } }, aws: { bucketName: process.env.S3BUCKET } });

const request = async () => {
  try {
    const adapter = await low(storage);
    logger.info('storage initialized');
    const router = jsonServer.router(adapter)
    const middlewares = jsonServer.defaults();
    server.use(middlewares);
    server.use(router);
  } catch (e) {
    if (e.code === 'ExpiredToken') {
      logger.error('Please add valid credentials for AWS. Error: ' + e.message);
    } else {
      logger.error(e.code);
    }
  }
}

const handler = serverless(server);
module.exports.handler = async (event, context) => {
  await request();
  return await handler(event, context);
};

server.start = function () {
  // start the web server
  const port = 3000;
  return server.listen(port, () => {
    logger.info('JSON Server is running under port 3000. Use http://localhost:' + port + ' to access it')
  });
};

if (require.main === module) {
  request();
  server.start();
}
const fs = require('fs');
const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3');
const jsonServer = require('json-server');

const defaultDB = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const logger = require('pino')({
  prettyPrint: true,
}, process.stderr);

const server = jsonServer.create();
let storage = null;

function startLocal() {
  logger.info('start local environment');

  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults();
  server.use(middlewares);
  server.use(router);
}

function startInCloud() {
  logger.info(`S3FILE: ${process.env.S3FILE}`);
  logger.info(`S3BUCKET: ${process.env.S3BUCKET}`);
  logger.info(`READONLY: ${process.env.READONLY}`);
  storage = new AwsAdapter(process.env.S3FILE, {
    defaultValue: defaultDB,
    aws: { bucketName: process.env.S3BUCKET },
  });
}

const request = async () => {
  try {
    const adapter = await low(storage);
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

function init() {
  if (process.env.NODE_ENV === 'local') {
    startLocal(3000);
  } else if (process.env.NODE_ENV === 'diagnostic') {
    logger.info('start diagnostic mode');
    logger.info('load variables from .env file');
    // eslint-disable-next-line global-require
    require('dotenv').config();
    startInCloud();
  } else {
    startInCloud();
  }
}
init();

module.exports = { server, request };

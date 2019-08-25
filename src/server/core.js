const express = require('express');
const fs = require('fs');
const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3');
const jsonServer = require('json-server');
const { logger } = require('./logger');
const swagger = require('./swagger/swagger');

const appConfig = JSON.parse(fs.readFileSync('./config/appconfig.json', 'UTF-8'));
const server = express();
let storage = null;
let defaultDB = null;
function setupServer(middlewares, router) {
  if (appConfig.enableSwagger) {
    middlewares.splice(middlewares.findIndex((x) => x.name === 'serveStatic'), 1);
  }
  server.use(middlewares);
  server.use('/api', router);
}

async function initializeLayers() {
  const adapter = await low(storage);
  const router = jsonServer.router(adapter);
  const middlewares = jsonServer.defaults({ readOnly: appConfig.readOnly });
  return { middlewares, router };
}

function startLocal(db) {
  logger.info('start locals environment');
  const router = jsonServer.router(db);
  const middlewares = jsonServer.defaults({ readOnly: appConfig.readOnly });
  setupServer(middlewares, router, db);
}

function startInCloud(db) {
  logger.info(`S3File: ${process.env.S3File}`);
  logger.info(`S3Bucket: ${process.env.S3Bucket}`);
  logger.info(`readOnly: ${appConfig.readOnly}`);
  logger.info(`basePath: ${process.env.basePath}`);
  storage = new AwsAdapter(process.env.S3File, {
    defaultValue: db,
    aws: { bucketName: process.env.S3Bucket },
  });
}

const request = async () => {
  try {
    const { middlewares, router } = await initializeLayers();
    setupServer(middlewares, router, defaultDB);
  } catch (e) {
    if (e.code === 'ExpiredToken') {
      logger.error(`Please add valid credentials for AWS. Error: ${e.message}`);
    } else {
      logger.error(e.code);
    }
  }
};

const init = async () => {
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);

  if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'debug') {
    defaultDB = JSON.parse(fs.readFileSync(appConfig.jsonFile, 'UTF-8'));
    startLocal(defaultDB);
  } else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'offline') {
    logger.info('start development mode');
    logger.info('load variables from .env file');
    // eslint-disable-next-line global-require
    require('dotenv').config();
    defaultDB = JSON.parse(fs.readFileSync(process.env.S3File, 'UTF-8'));
    startInCloud(defaultDB);
    const { middlewares, router } = await initializeLayers();
    setupServer(middlewares, router);
  } else {
    defaultDB = JSON.parse(fs.readFileSync(process.env.S3File, 'UTF-8'));
    startInCloud(defaultDB);
    const { middlewares, router } = await initializeLayers();
    setupServer(middlewares, router);
  }
  if (appConfig.enableSwagger) {
    swagger.generateSwagger(server, defaultDB, appConfig, true);
  }
};

server.use('/reload', async () => {
  await init();
});

module.exports = {
  server, request, init,
};

const express = require('express');
const fs = require('fs');
const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3');
const jsonServer = require('json-server');
const { logger } = require('./logger');
const swagger = require('./swagger/swagger');


const defaultDB = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const appConfig = JSON.parse(fs.readFileSync('./config/appconfig.json', 'UTF-8'));

const server = express();

let storage = null;


function setupServer(middlewares, router) {
  server.use(middlewares);
  server.use('/api', router);
  if (appConfig.enableSwagger) {
    swagger.generateSwagger(server, defaultDB, appConfig);
  }
}

function startLocal() {
  logger.info('start locals environment');
  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults({ readOnly: appConfig.readOnly });
  setupServer(middlewares, router);
}

function startInCloud() {
  logger.info(`S3File: ${process.env.S3File}`);
  logger.info(`S3Bucket: ${process.env.S3Bucket}`);
  logger.info(`readOnly: ${appConfig.readOnly}`);
  logger.info(`basePath: ${process.env.basePath}`);
  storage = new AwsAdapter(process.env.S3File, {
    defaultValue: defaultDB,
    aws: { bucketName: process.env.S3Bucket },
  });
}

const request = async () => {
  try {
    const adapter = await low(storage);
    const router = jsonServer.router(adapter);
    const middlewares = jsonServer.defaults({ readOnly: appConfig.readOnly });
    setupServer(middlewares, router);
  } catch (e) {
    if (e.code === 'ExpiredToken') {
      logger.error(`Please add valid credentials for AWS. Error: ${e.message}`);
    } else {
      logger.error(e.code);
    }
  }
};

function init() {
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'debug') {
    startLocal(3000);
  } else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'offline') {
    logger.info('start development mode');
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

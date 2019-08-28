import express from 'express';
import fs from 'fs';
import * as lowdb from 'lowdb';
const awsAdapter = require('lowdb-adapter-aws-s3');
import jsonServer = require('json-server');
import { Logger } from './logger';
import { Swagger } from './swagger/swagger';
import { AppConfig } from './config';
import { request } from 'https';

export interface CoreEngine {
  init(): Promise<void>;
  request(): Promise<void>;
}

export class Core implements CoreEngine {
  private logger = new Logger().logger;
  private swagger = new Swagger();
  private storage = {} as lowdb.AdapterAsync;
  private defaultDB = {} as object;
  private appConfig: AppConfig = JSON.parse(
    fs.readFileSync('./config/appconfig.json', 'UTF-8')
  );
  server: express.Express;

  constructor(server: express.Express) {
    this.server = server;
  }

  private setupServer(middlewares: express.Handler[], router: express.Router) {
    if (this.appConfig.enableSwagger) {
      middlewares.splice(
        middlewares.findIndex(x => x.name === 'serveStatic'),
        1
      );
    }
    this.server.use(middlewares);
    this.server.use('/api', router);
  }

  private async initializeLayers() {
    const adapter = await lowdb.default(this.storage);
    const router = jsonServer.router(adapter);
    const middlewares = jsonServer.defaults({
      readOnly: this.appConfig.readOnly,
    });
    return { middlewares, router };
  }

  private startLocal(db: {}) {
    this.logger.info('start locals environment');
    const router = jsonServer.router(db);
    const middlewares = jsonServer.defaults({
      readOnly: this.appConfig.readOnly,
    });
    this.setupServer(middlewares, router);
  }

  private startInCloud(db: {}) {
    this.logger.info(`S3File: ${process.env.S3File}`);
    this.logger.info(`S3Bucket: ${process.env.S3Bucket}`);
    this.logger.info(`readOnly: ${this.appConfig.readOnly}`);
    this.logger.info(`basePath: ${process.env.basePath}`);
    this.storage = new awsAdapter(process.env.S3File, {
      defaultValue: db,
      aws: { bucketName: process.env.S3Bucket },
    });
  }

  request = async () => {
    try {
      const { middlewares, router } = await this.initializeLayers();
      this.setupServer(middlewares, router);
    } catch (e) {
      if (e.code === 'ExpiredToken') {
        this.logger.error(
          `Please add valid credentials for AWS. Error: ${e.message}`
        );
      } else {
        this.logger.error(e);
      }
    }
  };

  init = async () => {
    this.logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);

    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'debug') {
      this.defaultDB = JSON.parse(
        fs.readFileSync(this.appConfig.jsonFile, 'UTF-8')
      );
      this.startLocal(this.defaultDB);
    } else if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'offline'
    ) {
      this.logger.info('start development mode');
      this.logger.info('load variables from .env file');
      // eslint-disable-next-line global-require
      require('dotenv').config();
      this.defaultDB = JSON.parse(
        fs.readFileSync(process.env.S3File as string, 'UTF-8')
      );
      this.startInCloud(this.defaultDB);
      const { middlewares, router } = await this.initializeLayers();
      this.setupServer(middlewares, router);
    } else {
      this.defaultDB = JSON.parse(
        fs.readFileSync(process.env.S3File as string, 'UTF-8')
      );
      this.startInCloud(this.defaultDB);
      const { middlewares, router } = await this.initializeLayers();
      this.setupServer(middlewares, router);
    }
    if (this.appConfig.enableSwagger) {
      this.swagger.generateSwagger(
        this.server,
        this.defaultDB,
        this.appConfig,
        true
      );
    }
    this.server.use('/reload', async () => {
      await this.init();
    });
  };
}

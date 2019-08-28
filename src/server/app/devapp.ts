import { CoreApp } from './app';
import fs from 'fs';
const awsAdapter = require('lowdb-adapter-aws-s3');

export class DevApp extends CoreApp {
  private s3bucket = '';
  private s3file = '';

  protected initEnvironmentVariables(): void {
    this.logger.info('load variables from .env file');
    require('dotenv').config();
    this.s3bucket = process.env.S3Bucket as string;
    this.s3file = process.env.S3File as string;
  }

  async setupStorage(): Promise<void> {
    const db = JSON.parse(
      fs.readFileSync(this.appConfig.jsonFile as string, 'UTF-8')
    );
    CoreApp.storage = new awsAdapter(this.s3file, {
      defaultValue: db,
      aws: { bucketName: this.s3bucket },
    });
  }

  async setupApp(): Promise<object> {
    this.logger.info('start development mode');

    const { middlewares, router, adapter } = await this.initializeLayers();
    this.setupServer(middlewares, router);
    const json = await adapter.getState();
    return json;
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
}

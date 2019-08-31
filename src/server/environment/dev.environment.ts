import { Environment } from './environment';
import * as dotenv from 'dotenv';
export class DevEnvironment extends Environment {
  s3File: string;
  s3Bucket: string;

  constructor() {
    super();
    dotenv.config();
    this.s3File = process.env.s3File as string;
    this.s3Bucket = process.env.s3Bucket as string;
    this.basePath = process.env.basePath as string;
  }
}

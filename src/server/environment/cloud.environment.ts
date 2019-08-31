import { Environment } from './environment';

export class CloudEnvironment extends Environment {
  s3File: string;
  s3Bucket: string;

  constructor() {
    super();
    this.s3File = process.env.s3File as string;
    this.s3Bucket = process.env.s3Bucket as string;
    this.basePath = process.env.basePath as string;
  }
}

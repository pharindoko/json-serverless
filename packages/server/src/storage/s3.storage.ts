import { StorageAdapter } from './storage';
import fs from 'fs';
const awsAdapter = require('lowdb-adapter-aws-s3');

export class S3StorageAdapter implements StorageAdapter {
  private s3bucket: string;
  private s3file: string;
  constructor(s3bucket: string, s3file: string) {
    this.s3bucket = s3bucket;
    this.s3file = s3file;
  }

  init(): import('lowdb').AdapterAsync {
    const db = JSON.parse(fs.readFileSync(this.s3file, 'UTF-8'));
    const storageAdapter = new awsAdapter(this.s3file, {
      defaultValue: db,
      aws: { bucketName: this.s3bucket },
    });
    return storageAdapter;
  }
}

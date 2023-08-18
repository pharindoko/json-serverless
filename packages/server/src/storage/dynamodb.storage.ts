import { StorageAdapter } from './storage';
import fs from 'fs';
import { DynamoDBLowDBAdapter } from './dynamodb.adapter';
import { AdapterAsync } from 'lowdb';

export class DynamoDBStorageAdapter implements StorageAdapter {
  private table: string;
  private keyId: string;
  private jsonFilePath: string;
  private region: string;
  constructor(table: string, keyId: string, jsonFilePath: string, region) {
    this.table = table;
    this.keyId = keyId;
    this.jsonFilePath = jsonFilePath;
    this.region = region;
  }

  init(): import('lowdb').AdapterAsync {
    console.log('initController');
    const db = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf8'));
    const storageAdapter = new DynamoDBLowDBAdapter(
      db,
      this.table,
      this.keyId,
      this.region
    ) as unknown;

    return storageAdapter as AdapterAsync;
  }
}

import { StorageAdapter } from './storage';
import fs from 'fs';
import { AzureFileShareLowDBAdapter } from './azure.fileshare.adapter';
import { AdapterAsync } from 'lowdb';

export class AzureFileShareStorageAdapter implements StorageAdapter {
  private azureStorageConnectionString: string;
  private shareName: string;
  private directoryName: string;
  private jsonFilePath: string;
  constructor(
    azureStorageConnectionString: string,
    shareName: string,
    directoryName: string,
    jsonFilePath: string
  ) {
    this.azureStorageConnectionString = azureStorageConnectionString;
    this.shareName = shareName;
    this.directoryName = directoryName;
    this.jsonFilePath = jsonFilePath;
  }

  init(): AdapterAsync {
    console.log('initController');
    const db = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf8'));
    const storageAdapter = new AzureFileShareLowDBAdapter(
      db,
      this.azureStorageConnectionString,
      this.shareName,
      this.directoryName,
      this.jsonFilePath
    ) as unknown;

    return storageAdapter as AdapterAsync;
  }
}

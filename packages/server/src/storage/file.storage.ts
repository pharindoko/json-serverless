import { StorageAdapter } from './storage';
import FileAsync from 'lowdb/adapters/FileAsync';

export class FileStorageAdapter implements StorageAdapter {
  private initialFilePath: string;
  constructor(initialFilePath: string) {
    this.initialFilePath = initialFilePath;
  }

  async init(): Promise<import('lowdb').AdapterAsync> {
    const storageAdapter = new FileAsync(this.initialFilePath);
    return storageAdapter;
  }
}

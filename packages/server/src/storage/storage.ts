import lowdb from 'lowdb';

export interface StorageAdapter {
  init(): lowdb.AdapterAsync;
}

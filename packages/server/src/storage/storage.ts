import lowdb = require('lowdb');

export interface StorageAdapter {
  init(): lowdb.AdapterAsync;
}

import lowdb = require('lowdb');
export interface StorageAdapter {
    init(): Promise<lowdb.AdapterAsync>;
}

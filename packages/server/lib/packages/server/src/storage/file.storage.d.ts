import { StorageAdapter } from './storage';
export declare class FileStorageAdapter implements StorageAdapter {
    private initialFilePath;
    constructor(initialFilePath: string);
    init(): Promise<import('lowdb').AdapterAsync>;
}

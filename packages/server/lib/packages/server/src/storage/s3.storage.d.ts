import { StorageAdapter } from './storage';
export declare class S3StorageAdapter implements StorageAdapter {
    private s3bucket;
    private s3file;
    constructor(s3bucket: string, s3file: string);
    init(): Promise<import('lowdb').AdapterAsync>;
}

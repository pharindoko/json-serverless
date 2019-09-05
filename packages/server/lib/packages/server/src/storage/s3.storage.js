"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const awsAdapter = require('lowdb-adapter-aws-s3');
class S3StorageAdapter {
    constructor(s3bucket, s3file) {
        this.s3bucket = s3bucket;
        this.s3file = s3file;
    }
    async init() {
        const db = JSON.parse(fs_1.default.readFileSync(this.s3file, 'UTF-8'));
        const storageAdapter = new awsAdapter(this.s3file, {
            defaultValue: db,
            aws: { bucketName: this.s3bucket },
        });
        return storageAdapter;
    }
}
exports.S3StorageAdapter = S3StorageAdapter;
//# sourceMappingURL=s3.storage.js.map
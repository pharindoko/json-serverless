"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileAsync_1 = __importDefault(require("lowdb/adapters/FileAsync"));
class FileStorageAdapter {
    constructor(initialFilePath) {
        this.initialFilePath = initialFilePath;
    }
    async init() {
        const storageAdapter = new FileAsync_1.default(this.initialFilePath);
        return storageAdapter;
    }
}
exports.FileStorageAdapter = FileStorageAdapter;
//# sourceMappingURL=file.storage.js.map
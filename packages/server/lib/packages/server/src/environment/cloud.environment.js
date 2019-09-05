"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./environment");
class CloudEnvironment extends environment_1.Environment {
    constructor() {
        super();
        this.s3File = process.env.s3File;
        this.s3Bucket = process.env.s3Bucket;
        this.basePath = process.env.basePath;
    }
}
exports.CloudEnvironment = CloudEnvironment;
//# sourceMappingURL=cloud.environment.js.map
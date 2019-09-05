"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./environment");
const dotenv = __importStar(require("dotenv"));
class DevEnvironment extends environment_1.Environment {
    constructor() {
        super();
        dotenv.config();
        this.s3File = process.env.s3File;
        this.s3Bucket = process.env.s3Bucket;
        this.basePath = process.env.basePath;
    }
}
exports.DevEnvironment = DevEnvironment;
//# sourceMappingURL=dev.environment.js.map
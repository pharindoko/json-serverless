"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_config_1 = require("./app/app.config");
const fs_1 = __importDefault(require("fs"));
const app_1 = require("./app");
const swagger_1 = require("./specifications/swagger/swagger");
const swagger_config_1 = require("./specifications/swagger/swagger.config");
const s3_storage_1 = require("./storage/s3.storage");
const cloud_environment_1 = require("./environment/cloud.environment");
const server = express_1.default();
const sls = serverless_http_1.default(server);
const defaultConfig = new app_config_1.AppConfig();
const config = JSON.parse(fs_1.default.readFileSync('./config/appconfig.json', 'UTF-8'));
const appConfig = app_config_1.AppConfig.merge(defaultConfig, config);
const environment = new cloud_environment_1.CloudEnvironment();
const swagger = new swagger_1.Swagger(server, new swagger_config_1.SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth), environment.basePath);
const core = new app_1.CloudApp(appConfig, server, new s3_storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), swagger);
(async () => {
    await core.setup();
    await core.request();
})();
exports.handler = async (event, _context) => {
    await core.request();
    const result = await sls(event, _context);
    return result;
};
//# sourceMappingURL=handler.js.map
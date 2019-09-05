"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coreserver_1 = require("./coreserver");
const app_1 = require("./app");
const storage_1 = require("./storage");
const specifications_1 = require("./specifications");
const environment_1 = require("./environment");
class ServerFactory {
    static create(coreserver, app, environment, storage, appConfig, server) {
        const env = new environment();
        const swagger = new specifications_1.Swagger(server, new specifications_1.SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth), env.basePath);
        const core = new coreserver(server, new app(appConfig, server, storage, swagger));
        return core;
    }
}
exports.ServerFactory = ServerFactory;
ServerFactory.createServer = async (type, server, appConfig) => {
    let coreserver = {};
    switch (type) {
        case 'local': {
            coreserver = ServerFactory.create(coreserver_1.LocalServer, app_1.CoreApp, environment_1.Environment, new storage_1.FileStorageAdapter(appConfig.jsonFile), appConfig, server);
            break;
        }
        case 'debug': {
            coreserver = ServerFactory.create(coreserver_1.LocalServer, app_1.CoreApp, environment_1.Environment, new storage_1.FileStorageAdapter(appConfig.jsonFile), appConfig, server);
            break;
        }
        case 'development': {
            const environment = new environment_1.DevEnvironment();
            coreserver = ServerFactory.create(coreserver_1.DevServer, app_1.CloudApp, environment_1.DevEnvironment, new storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), appConfig, server);
            break;
        }
        case 'offline': {
            const environment = new environment_1.CloudEnvironment();
            coreserver = ServerFactory.create(coreserver_1.CloudServer, app_1.CloudApp, environment_1.DevEnvironment, new storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), appConfig, server);
            break;
        }
        case 'test': {
            coreserver = ServerFactory.create(coreserver_1.TestServer, app_1.CoreApp, environment_1.Environment, new storage_1.FileStorageAdapter(appConfig.jsonFile), appConfig, server);
            break;
        }
        default: {
            const environment = new environment_1.CloudEnvironment();
            coreserver = ServerFactory.create(coreserver_1.CloudServer, app_1.CloudApp, environment_1.CloudEnvironment, new storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), appConfig, server);
            break;
        }
    }
    await coreserver.init();
    return coreserver;
};
//# sourceMappingURL=factory.js.map
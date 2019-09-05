"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const factory_1 = require("./factory");
const app_config_1 = require("./app/app.config");
exports.startServer = async (environment, server, appConfig) => {
    factory_1.ServerFactory.createServer(environment, server, appConfig);
};
(async () => {
    if (require.main === module) {
        const server = express_1.default();
        const defaultConfig = new app_config_1.AppConfig();
        defaultConfig.jsonFile = '../../db.json';
        exports.startServer(process.env.NODE_ENV, server, defaultConfig);
    }
})();
//# sourceMappingURL=server.js.map
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const lowdb = __importStar(require("lowdb"));
const jsonServer = require("json-server");
const json_validator_1 = require("../validations/json.validator");
const output_1 = require("../utils/output");
class CoreApp {
    constructor(appConfig, server, storageAdapter, apispec) {
        this.logger = new logger_1.Logger().logger;
        this.appConfig = appConfig;
        this.server = server;
        this.storageAdapter = storageAdapter;
        this.apispec = apispec;
    }
    async setup() {
        await this.setupStorage();
        const json = await this.getJSON();
        const isValid = this.validateJSON(json);
        if (isValid) {
            await this.setupApp();
            this.setupSwagger(json);
            await this.setupRoutes();
        }
        else {
            output_1.Output.setError('provided json is not valid - see validation checks');
            throw Error('provided json is not valid - see validation checks');
        }
    }
    async setupStorage() {
        CoreApp.storage = await this.storageAdapter.init();
        CoreApp.adapter = await lowdb.default(CoreApp.storage);
    }
    async setupApp() {
        const { middlewares, router } = await this.initializeLayers();
        this.setupServer(middlewares, router);
    }
    validateJSON(db) {
        let isValid = true;
        if (this.appConfig.enableJSONValidation) {
            isValid = json_validator_1.JSONValidator.validate(db);
        }
        return isValid;
    }
    async getJSON() {
        const json = await CoreApp.adapter.getState();
        return json;
    }
    setupSwagger(db) {
        if (this.appConfig.enableSwagger) {
            this.apispec.generateSpecification(db, true);
        }
    }
    setupRoutes() {
        this.server.use('/reload', async () => {
            Error('not implemented');
        });
    }
    async initializeLayers() {
        if (CoreApp.adapter &&
            Object.entries(CoreApp.adapter).length === 0 &&
            CoreApp.adapter.constructor === Object) {
            CoreApp.adapter = await lowdb.default(CoreApp.storage);
        }
        const router = jsonServer.router(CoreApp.adapter);
        const middlewares = jsonServer.defaults({
            readOnly: this.appConfig.readOnly,
        });
        return { middlewares, router };
    }
    setupServer(middlewares, router) {
        if (this.appConfig.enableSwagger) {
            middlewares.splice(middlewares.findIndex(x => x.name === 'serveStatic'), 1);
        }
        this.server.use(middlewares);
        this.server.use('/api', router);
    }
}
exports.CoreApp = CoreApp;
CoreApp.storage = {};
CoreApp.adapter = {};
//# sourceMappingURL=core.app.js.map
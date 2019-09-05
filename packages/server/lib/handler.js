(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../package.json":
/*!***************************************************************************!*\
  !*** /Users/uid10804/Documents/development2/json-serverless/package.json ***!
  \***************************************************************************/
/*! exports provided: name, version, description, main, scripts, repository, author, license, bugs, homepage, devDependencies, snyk, config, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"json-serverless\",\"version\":\"0.0.0-development\",\"description\":\"Transform a json file into an api\",\"main\":\"src/server.js\",\"scripts\":{\"snyk-protect\":\"snyk protect\",\"commit\":\"git-cz\",\"bootstrap\":\"lerna bootstrap\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/pharindoko/json-serverless.git\"},\"author\":\"\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/pharindoko/json-serverless/issues\"},\"homepage\":\"https://github.com/pharindoko/json-serverless.git#readme\",\"devDependencies\":{\"@semantic-release/changelog\":\"3.0.4\",\"@semantic-release/git\":\"7.0.16\",\"@types/aws-lambda\":\"8.10.31\",\"@types/dotenv\":\"6.1.1\",\"@types/express\":\"4.17.1\",\"@types/jest\":\"24.0.18\",\"@types/json-server\":\"0.14.1\",\"@types/lodash\":\"4.14.138\",\"@types/lowdb\":\"1.0.9\",\"@types/node\":\"10.14.16\",\"@types/supertest\":\"2.0.8\",\"@types/swagger-schema-official\":\"2.0.18\",\"@types/swagger-ui-express\":\"3.0.1\",\"copy-webpack-plugin\":\"5.0.4\",\"cz-conventional-changelog\":\"3.0.2\",\"eslint\":\"6.3.0\",\"eslint-config-airbnb-base\":\"14.0.0\",\"eslint-plugin-import\":\"2.18.2\",\"express-swagger-generator\":\"1.1.15\",\"gts\":\"1.1.0\",\"jest\":\"24.9.0\",\"node-env-webpack-plugin\":\"1.1.0\",\"nodemon\":\"1.19.2\",\"nodemon-webpack-plugin\":\"4.0.8\",\"pino-pretty\":\"3.2.1\",\"serverless-offline\":\"5.10.1\",\"serverless-webpack\":\"5.3.1\",\"terser-webpack-plugin\":\"1.4.1\",\"ts-jest\":\"24.0.2\",\"ts-loader\":\"6.0.4\",\"typescript\":\"3.6.2\",\"webpack\":\"4.39.3\",\"webpack-cli\":\"3.3.7\",\"webpack-node-externals\":\"1.7.2\"},\"snyk\":true,\"config\":{\"commitizen\":{\"path\":\"./node_modules/cz-conventional-changelog\"}}}");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/app/app.config.ts":
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    constructor() {
        this.readOnly = false;
        this.enableSwagger = true;
        this.enableApiKeyAuth = false;
        this.jsonFile = 'db.json';
        this.enableJSONValidation = true;
    }
}
exports.AppConfig = AppConfig;
AppConfig.merge = (t, u) => Object.assign({}, t, u);


/***/ }),

/***/ "./src/app/cloud.app.ts":
/*!******************************!*\
  !*** ./src/app/cloud.app.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_app_1 = __webpack_require__(/*! ./core.app */ "./src/app/core.app.ts");
const output_1 = __webpack_require__(/*! ../utils/output */ "./src/utils/output.ts");
class CloudApp extends core_app_1.CoreApp {
    constructor() {
        super(...arguments);
        this.request = async () => {
            try {
                const { middlewares, router } = await this.initializeLayers();
                this.setupServer(middlewares, router);
            }
            catch (e) {
                if (e.code === 'ExpiredToken') {
                    output_1.Output.setError(`Please add valid credentials for AWS. Error: ${e.message}`);
                }
                else {
                    output_1.Output.setError(e.message);
                }
            }
        };
    }
}
exports.CloudApp = CloudApp;


/***/ }),

/***/ "./src/app/core.app.ts":
/*!*****************************!*\
  !*** ./src/app/core.app.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
const lowdb = __importStar(__webpack_require__(/*! lowdb */ "lowdb"));
const jsonServer = __webpack_require__(/*! json-server */ "json-server");
const json_validator_1 = __webpack_require__(/*! ../validations/json.validator */ "./src/validations/json.validator.ts");
const output_1 = __webpack_require__(/*! ../utils/output */ "./src/utils/output.ts");
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


/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./cloud.app */ "./src/app/cloud.app.ts"));
__export(__webpack_require__(/*! ./core.app */ "./src/app/core.app.ts"));
__export(__webpack_require__(/*! ./app.config */ "./src/app/app.config.ts"));


/***/ }),

/***/ "./src/coreserver/cloud.server.ts":
/*!****************************************!*\
  !*** ./src/coreserver/cloud.server.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
class CloudServer extends server_1.CoreServer {
    constructor(server, core) {
        super(server, core);
        this.server = server;
        this.core = core;
    }
    async init() {
        await this.core.setup();
        await this.core.request();
    }
}
exports.CloudServer = CloudServer;


/***/ }),

/***/ "./src/coreserver/dev.server.ts":
/*!**************************************!*\
  !*** ./src/coreserver/dev.server.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
class DevServer extends server_1.CoreServer {
    constructor(server, core) {
        super(server, core);
        this.server = server;
        this.core = core;
    }
    async init() {
        await this.core.setup();
        await this.core.request();
        this.start(this.server, 3000);
    }
}
exports.DevServer = DevServer;


/***/ }),

/***/ "./src/coreserver/index.ts":
/*!*********************************!*\
  !*** ./src/coreserver/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./cloud.server */ "./src/coreserver/cloud.server.ts"));
__export(__webpack_require__(/*! ./dev.server */ "./src/coreserver/dev.server.ts"));
__export(__webpack_require__(/*! ./local.server */ "./src/coreserver/local.server.ts"));
__export(__webpack_require__(/*! ./test.server */ "./src/coreserver/test.server.ts"));


/***/ }),

/***/ "./src/coreserver/local.server.ts":
/*!****************************************!*\
  !*** ./src/coreserver/local.server.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
class LocalServer extends server_1.CoreServer {
    async init() {
        await this.core.setup();
        this.start(this.server, 3000);
    }
}
exports.LocalServer = LocalServer;


/***/ }),

/***/ "./src/coreserver/server.ts":
/*!**********************************!*\
  !*** ./src/coreserver/server.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
const logger = new logger_1.Logger().logger;
class CoreServer {
    constructor(server, core) {
        this.server = server;
        this.core = core;
    }
    start(server, port) {
        // start the web server
        server.listen(port);
        logger.info(`JSON Server is running under port ${port}. Use http://localhost:${port} to access it`);
    }
}
exports.CoreServer = CoreServer;


/***/ }),

/***/ "./src/coreserver/test.server.ts":
/*!***************************************!*\
  !*** ./src/coreserver/test.server.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
class TestServer extends server_1.CoreServer {
    async init() {
        await this.core.setup();
    }
}
exports.TestServer = TestServer;


/***/ }),

/***/ "./src/environment/cloud.environment.ts":
/*!**********************************************!*\
  !*** ./src/environment/cloud.environment.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __webpack_require__(/*! ./environment */ "./src/environment/environment.ts");
class CloudEnvironment extends environment_1.Environment {
    constructor() {
        super();
        this.s3File = process.env.s3File;
        this.s3Bucket = process.env.s3Bucket;
        this.basePath = process.env.basePath;
    }
}
exports.CloudEnvironment = CloudEnvironment;


/***/ }),

/***/ "./src/environment/dev.environment.ts":
/*!********************************************!*\
  !*** ./src/environment/dev.environment.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __webpack_require__(/*! ./environment */ "./src/environment/environment.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
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


/***/ }),

/***/ "./src/environment/environment.ts":
/*!****************************************!*\
  !*** ./src/environment/environment.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    constructor() {
        this.basePath = '/';
        this.basePath = '/';
    }
}
exports.Environment = Environment;


/***/ }),

/***/ "./src/environment/index.ts":
/*!**********************************!*\
  !*** ./src/environment/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./cloud.environment */ "./src/environment/cloud.environment.ts"));
__export(__webpack_require__(/*! ./environment */ "./src/environment/environment.ts"));
__export(__webpack_require__(/*! ./dev.environment */ "./src/environment/dev.environment.ts"));


/***/ }),

/***/ "./src/factory.ts":
/*!************************!*\
  !*** ./src/factory.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const coreserver_1 = __webpack_require__(/*! ./coreserver */ "./src/coreserver/index.ts");
const app_1 = __webpack_require__(/*! ./app */ "./src/app/index.ts");
const storage_1 = __webpack_require__(/*! ./storage */ "./src/storage/index.ts");
const specifications_1 = __webpack_require__(/*! ./specifications */ "./src/specifications/index.ts");
const environment_1 = __webpack_require__(/*! ./environment */ "./src/environment/index.ts");
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


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const factory_1 = __webpack_require__(/*! ./factory */ "./src/factory.ts");
const app_config_1 = __webpack_require__(/*! ./app/app.config */ "./src/app/app.config.ts");
exports.startServer = async (environment, server, appConfig) => {
    factory_1.ServerFactory.createServer(environment, server, appConfig);
};
(async () => {
    if (__webpack_require__.c[__webpack_require__.s] === module) {
        const server = express_1.default();
        const defaultConfig = new app_config_1.AppConfig();
        defaultConfig.jsonFile = '../../db.json';
        exports.startServer("local", server, defaultConfig);
    }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/specifications/index.ts":
/*!*************************************!*\
  !*** ./src/specifications/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./swagger/swagger */ "./src/specifications/swagger/swagger.ts"));
__export(__webpack_require__(/*! ./swagger/swagger.config */ "./src/specifications/swagger/swagger.config.ts"));


/***/ }),

/***/ "./src/specifications/swagger/swagger.config.ts":
/*!******************************************************!*\
  !*** ./src/specifications/swagger/swagger.config.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SwaggerConfig {
    constructor(readOnly, enableApiKeyAuth) {
        this.readOnly = false;
        this.enableApiKeyAuth = false;
        this.readOnly = readOnly;
        this.enableApiKeyAuth = enableApiKeyAuth;
    }
}
exports.SwaggerConfig = SwaggerConfig;


/***/ }),

/***/ "./src/specifications/swagger/swagger.defgen.ts":
/*!******************************************************!*\
  !*** ./src/specifications/swagger/swagger.defgen.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-use-before-define */
Object.defineProperty(exports, "__esModule", { value: true });
class SwaggerDefGen {
    constructor() {
        this.outSwagger = '';
        this.tabCount = 0;
        this.indentator = '';
        this.nullType = 'string';
        this.generateDefinitions = (json) => {
            this.tabCount = 0;
            this.indentator = '\n';
            // ---- Begin definitions ----
            this.outSwagger = '{"definitions": {';
            this.changeIndentation(1);
            // For each object inside the JSON
            Object.keys(json).forEach(obj => {
                this.outSwagger += `${this.indentator}"${obj}": {`;
                this.conversorSelection(json[obj]);
                this.outSwagger += `${this.indentator}},`;
            });
            // Remove last comma
            this.outSwagger = this.outSwagger.substring(0, this.outSwagger.length - 1);
            // ---- End definitions ----
            this.changeIndentation(this.tabCount - 1);
            this.outSwagger += `${this.indentator}}}`;
            const jsonDefinition = JSON.parse(this.outSwagger);
            return jsonDefinition;
        };
    }
    // ---- Functions definitions ----
    changeIndentation(count) {
        /*
          Assign 'this.indentator' a string beginning with newline and followed by 'count' tabs
          Updates variable 'tabCount' with the number of tabs used
          Global variables updated:
          -identator
          -tabcount
          */
        let i;
        if (count >= this.tabCount) {
            i = this.tabCount;
        }
        else {
            i = 0;
            this.indentator = '\n';
        }
        for (; i < count; i += 1) {
            this.indentator += '\t';
        }
        // Update tabCount
        this.tabCount = count;
    }
    isFloatNumber(num) {
        return Number(num) === num && num % 1 !== 0;
    }
    convertNumber(num) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given number
          Global variables updated:
          -this.outSwagger
          */
        if (Number.isInteger(num)) {
            this.outSwagger += `${this.indentator}"type": "integer",`;
            if (num < 2147483647 && num > -2147483647) {
                this.outSwagger += `${this.indentator}"format": "int32"`;
            }
            else if (Number.isSafeInteger(num)) {
                this.outSwagger += `${this.indentator}"format": "int64"`;
            }
            else {
                this.outSwagger += `${this.indentator}"format": "unsafe"`;
            }
        }
        else if (this.isFloatNumber(num)) {
            this.outSwagger += `${this.indentator}"format": "double"`;
        }
        else {
            this.outSwagger += `${this.indentator}"format": "unsafe"`;
        }
        this.outSwagger += `,${this.indentator}"example": "${num}"`;
    }
    // date is ISO8601 format - https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14
    convertString(str) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given string
          Global variables updated:
          -this.outSwagger
          */
        const regxDate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        const regxDateTime = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]{1,2})?(Z|(\+|-)([0-1][0-9]|2[0-3]):[0-5][0-9])$/;
        this.outSwagger += `${this.indentator}"type": "string"`;
        if (regxDateTime.test(str)) {
            this.outSwagger += ',';
            this.outSwagger += `${this.indentator}"format": "date-time"`;
        }
        else if (regxDate.test(str)) {
            this.outSwagger += ',';
            this.outSwagger += `${this.indentator}"format": "date"`;
        }
        this.outSwagger += `,${this.indentator}"example": "${str}"`;
    }
    convertArray(obj) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given array
          Global variables updated:
          -this.outSwagger
          */
        this.outSwagger += `${this.indentator}"type": "array",`;
        // ---- Begin items scope ----
        this.outSwagger += `${this.indentator}"items": {`;
        this.conversorSelection(obj);
        this.outSwagger += `${this.indentator}}`;
        // ---- End items scope ----
    }
    convertObject(obj) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given object
          Global variables updated:
          -this.outSwagger
          */
        // Convert null attributes to given type
        if (obj === null) {
            this.outSwagger += `${this.indentator}"type": "${this.nullType}",`;
            this.outSwagger += `${this.indentator}"format": "nullable"`;
            return;
        }
        // ---- Begin properties scope ----
        this.outSwagger += `${this.indentator}"type": "object",`;
        this.outSwagger += `${this.indentator}"properties": {`;
        this.changeIndentation(this.tabCount + 1);
        // For each attribute inside that object
        Object.keys(obj).forEach(prop => {
            // ---- Begin property type scope ----
            this.outSwagger += `${this.indentator}"${prop}": {`;
            this.conversorSelection(obj[prop]);
            this.outSwagger += `${this.indentator}},`;
            // ---- End property type scope ----
        });
        this.changeIndentation(this.tabCount - 1);
        if (Object.keys(obj).length > 0) {
            // At least 1 property inserted
            this.outSwagger = this.outSwagger.substring(0, this.outSwagger.length - 1); // Remove last comma
            this.outSwagger += `${this.indentator}}`;
        }
        else {
            // No property inserted
            this.outSwagger += ' }';
        }
    }
    conversorSelection(obj) {
        this.changeIndentation(this.tabCount + 1);
        if (typeof obj === 'number') {
            // attribute is a number
            this.convertNumber(obj);
        }
        else if (Object.prototype.toString.call(obj) === '[object Array]') {
            // attribute is an array
            this.convertArray(obj[0]);
        }
        else if (typeof obj === 'object') {
            // attribute is an object
            this.convertObject(obj);
        }
        else if (typeof obj === 'string') {
            // attribute is a string
            this.convertString(obj);
        }
        else if (typeof obj === 'boolean') {
            // attribute is a boolean
            this.outSwagger += `${this.indentator}"type": "boolean"`;
        }
        else {
            // not a valid Swagger type
            throw new Error(`Property type "${typeof obj}" not valid for Swagger definitions`);
        }
        this.changeIndentation(this.tabCount - 1);
    }
}
exports.SwaggerDefGen = SwaggerDefGen;


/***/ }),

/***/ "./src/specifications/swagger/swagger.spec.ts":
/*!****************************************************!*\
  !*** ./src/specifications/swagger/swagger.spec.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
const listEndpoints = __webpack_require__(/*! express-list-endpoints */ "express-list-endpoints");
const package_json_1 = __importDefault(__webpack_require__(/*! ../../../../../package.json */ "../../package.json"));
class SwaggerSpec {
    constructor() {
        this.packageJsonPath = `${process.cwd()}/package.json`;
        this.packageInfo = package_json_1.default;
        this.app = {};
        this.predefinedSpec = {};
        this.spec = {};
        this.getSpec = (app, predefinedSpec, readOnly, basePath) => {
            this.app = app;
            this.predefinedSpec = predefinedSpec;
            this.spec = this.initSpec(readOnly, basePath);
            return this.spec;
        };
        this.addSchemaDefitions = (specificaton, schemaDefinitons) => {
            const spec = Object.assign(specificaton, schemaDefinitons);
            Object.keys(spec.paths).forEach(path => {
                Object.keys(spec.definitions).forEach((definition) => {
                    const schemaDef = this.setSchemaReference(spec, definition);
                    if (path.endsWith(definition)) {
                        if (spec.paths[path].get) {
                            const operation = spec.paths[path].get;
                            Object.assign(spec.paths[path].get, this.getDefaultSchemaProperties(definition));
                            operation.responses[200] = {
                                schema: { $ref: `#/definitions/${definition}` },
                                description: 'successful operation',
                            };
                            operation.parameters = this.getQueryParameterSchema();
                        }
                        if (spec.paths[path].post) {
                            const operation = spec.paths[path].post;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, this.getDefaultPostResponses(definition));
                            operation.parameters.push(this.getDefaultParameterSchema(schemaDef, definition));
                        }
                        if (spec.paths[path].put) {
                            const operation = spec.paths[path].put;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, this.getDefaultPutResponses(definition));
                            operation.parameters.push(this.getDefaultParameterSchema(schemaDef, definition));
                        }
                        if (spec.paths[path].patch) {
                            const operation = spec.paths[path].patch;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, this.getDefaultPutResponses(definition));
                            operation.parameters.push(this.getDefaultParameterSchema(schemaDef, definition));
                        }
                    }
                    if (path.endsWith(`${definition}/{id}`)) {
                        if (spec.paths[path].get) {
                            const operation = spec.paths[path].get;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            operation.responses[200] = {
                                schema: { $ref: `#/definitions/${definition}` },
                                description: 'successful operation',
                            };
                        }
                        if (spec.paths[path].delete) {
                            const operation = spec.paths[path].delete;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, this.getDefaultDeleteResponses(definition));
                        }
                        if (spec.paths[path].put) {
                            const operation = spec.paths[path].put;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, this.getDefaultPutResponses(definition));
                            operation.parameters.push(this.getDefaultParameterSchema(schemaDef, definition));
                        }
                        if (spec.paths[path].patch) {
                            const operation = spec.paths[path].patch;
                            Object.assign(operation, this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, this.getDefaultPutResponses(definition));
                            operation.parameters.push(this.getDefaultParameterSchema(schemaDef, definition));
                        }
                    }
                });
            });
            return spec;
        };
        this.addAuthentication = (specificaton, auth) => {
            const spec = Object.assign(specificaton.securityDefinitions, auth);
            return spec;
        };
    }
    updateSpecFromPackage(basePath) {
        const newInfo = {
            version: '',
            title: '',
        };
        this.packageInfo = package_json_1.default;
        if (this.packageInfo.name) {
            newInfo.title = this.packageInfo.name;
        }
        if (this.packageInfo.version) {
            newInfo.version = this.packageInfo.version;
        }
        if (this.packageInfo.license) {
            newInfo.license = { name: this.packageInfo.license };
        }
        newInfo.description = `[Specification JSON](${basePath}/api-spec)`;
        if (this.packageInfo.description) {
            newInfo.description += `\n\n${this.packageInfo.description}`;
        }
        return newInfo;
    }
    sortObject(o) {
        const sorted = {};
        let key;
        const a = Object.keys(o);
        a.sort();
        for (key = 0; key < a.length; key += 1) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }
    initSpec(readOnly, basePath) {
        const info = this.updateSpecFromPackage(basePath);
        let specification = {
            swagger: '2.0',
            paths: {},
            info,
        };
        specification.swagger = '2.0';
        specification.paths = {};
        const excludedRoutes = ['/api/:resource/:id/:nested', '/api/db'];
        const endpoints = listEndpoints(this.app);
        endpoints.forEach((endpoint) => {
            if (readOnly) {
                for (let i = 0; i < endpoint.methods.length; i += 1) {
                    if (endpoint.methods[i] !== 'GET') {
                        endpoint.methods.splice(i, 1);
                        i -= 1;
                    }
                }
            }
            if (!excludedRoutes.includes(endpoint.path)) {
                const params = new Array();
                let { path } = endpoint;
                const matches = path.match(/:([^/]+)/g);
                if (matches) {
                    matches.forEach(found => {
                        const paramName = found.substr(1);
                        path = path.replace(found, `{${paramName}}`);
                        params.push(paramName);
                    });
                }
                if (!specification.paths[path]) {
                    specification.paths[path] = {};
                }
                endpoint.methods.forEach(m => {
                    specification.paths[path][m.toLowerCase()] = {
                        summary: path,
                        consumes: ['application/json'],
                        parameters: params.map(p => ({
                            name: p,
                            in: 'path',
                            required: true,
                            type: 'integer',
                        })) || [],
                        responses: {},
                    };
                });
            }
        });
        specification.basePath = basePath;
        specification = this.sortObject(lodash_1.default.merge(specification, this.predefinedSpec || {}));
        return specification;
    }
    setSchemaReference(spec, definition) {
        let schemaDef = {};
        if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: `#/definitions/${definition}/items` };
        }
        else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: `#/definitions/${definition}` };
        }
        return schemaDef;
    }
    getDefaultParameterSchema(schemaDef, definition) {
        return {
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
        };
    }
    getQueryParameterSchema() {
        return [
            {
                name: '_page',
                in: 'query',
                required: false,
                type: 'integer',
                description: 'parameter to return paginated data',
            },
            {
                name: '_limit',
                in: 'query',
                required: false,
                type: 'integer',
                description: 'parameter to limit paginated data',
            },
            {
                name: '_sort',
                in: 'query',
                required: false,
                type: 'string',
                description: 'sort by attributes',
            },
            {
                name: '_order',
                in: 'query',
                required: false,
                type: 'string',
                description: 'order ascending or descending',
                enum: ['asc', 'desc'],
            },
            {
                name: '_start',
                in: 'query',
                required: false,
                type: 'integer',
                description: 'parameter to set start sliced data',
            },
            {
                name: '_end',
                in: 'query',
                required: false,
                type: 'integer',
                description: 'parameter to set start sliced data',
            },
            {
                name: 'q',
                in: 'query',
                required: false,
                type: 'string',
                description: 'full text search',
            },
            {
                name: '_embed',
                in: 'query',
                required: false,
                type: 'string',
                description: 'include children resources',
            },
            {
                name: '_expand',
                in: 'query',
                required: false,
                type: 'string',
                description: 'include parent resource',
            },
        ];
    }
    getDefaultPostResponses(definition) {
        return {
            responses: {
                200: {
                    description: 'successful operation',
                    schema: {
                        $ref: `#/definitions/${definition}`,
                    },
                },
                400: {
                    description: `Invalid ${definition}`,
                },
            },
        };
    }
    getDefaultPutResponses(definition) {
        return {
            responses: {
                400: {
                    description: 'Invalid ID supplied',
                },
                404: {
                    description: `${definition} not found`,
                },
                405: {
                    description: 'Validation exception',
                },
            },
        };
    }
    getDefaultDeleteResponses(definition) {
        return {
            responses: {
                400: {
                    description: 'Invalid ID supplied',
                },
                404: {
                    description: `${definition} not found`,
                },
            },
        };
    }
    getDefaultSchemaProperties(definition) {
        return {
            produces: ['application/json'],
            tags: [definition],
        };
    }
}
exports.SwaggerSpec = SwaggerSpec;


/***/ }),

/***/ "./src/specifications/swagger/swagger.ts":
/*!***********************************************!*\
  !*** ./src/specifications/swagger/swagger.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUi = __importStar(__webpack_require__(/*! swagger-ui-express */ "swagger-ui-express"));
const swagger_spec_1 = __webpack_require__(/*! ./swagger.spec */ "./src/specifications/swagger/swagger.spec.ts");
const swagger_defgen_1 = __webpack_require__(/*! ./swagger.defgen */ "./src/specifications/swagger/swagger.defgen.ts");
const logger_1 = __webpack_require__(/*! ../../utils/logger */ "./src/utils/logger.ts");
const output_1 = __webpack_require__(/*! ../../utils/output */ "./src/utils/output.ts");
class Swagger {
    constructor(server, config, basePath) {
        this.swaggerSpec = new swagger_spec_1.SwaggerSpec();
        this.swaggerDefGen = new swagger_defgen_1.SwaggerDefGen();
        this.logger = new logger_1.Logger().logger;
        this.spec = {};
        this.generateSpecification = (json, regenerate) => {
            if (!this.spec || regenerate) {
                output_1.Output.setInfo('Init Swagger');
                const swaggerSchemaDefinitions = this.swaggerDefGen.generateDefinitions(json);
                this.spec = this.swaggerSpec.getSpec(this.server, {}, this.config.readOnly, this.basePath);
                const auth = {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'All requests must include the `x-api-key` header containing your account ID.',
                };
                if (this.config.enableApiKeyAuth) {
                    this.swaggerSpec.addAuthentication(this.spec, auth);
                }
                this.swaggerSpec.addSchemaDefitions(this.spec, swaggerSchemaDefinitions);
            }
            this.server.use('/api-spec', (req, res) => {
                res.setHeader('Content-Type', 'application/json');
                res.send(this.spec);
            });
            this.server.use('/', swaggerUi.serve, swaggerUi.setup(this.spec));
        };
        this.server = server;
        this.config = config;
        this.basePath = basePath;
    }
}
exports.Swagger = Swagger;


/***/ }),

/***/ "./src/storage/file.storage.ts":
/*!*************************************!*\
  !*** ./src/storage/file.storage.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileAsync_1 = __importDefault(__webpack_require__(/*! lowdb/adapters/FileAsync */ "lowdb/adapters/FileAsync"));
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


/***/ }),

/***/ "./src/storage/index.ts":
/*!******************************!*\
  !*** ./src/storage/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./file.storage */ "./src/storage/file.storage.ts"));
__export(__webpack_require__(/*! ./s3.storage */ "./src/storage/s3.storage.ts"));


/***/ }),

/***/ "./src/storage/s3.storage.ts":
/*!***********************************!*\
  !*** ./src/storage/s3.storage.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const awsAdapter = __webpack_require__(/*! lowdb-adapter-aws-s3 */ "lowdb-adapter-aws-s3");
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


/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor() {
        this.logger = __webpack_require__(/*! pino */ "pino")({
            prettyPrint: { colorize: true },
        }, process.stderr);
    }
}
exports.Logger = Logger;


/***/ }),

/***/ "./src/utils/output.ts":
/*!*****************************!*\
  !*** ./src/utils/output.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
class Output {
    static setWarning(message) {
        new logger_1.Logger().logger.warning(message);
    }
    static setError(message) {
        new logger_1.Logger().logger.error(message);
    }
    static setInfo(message) {
        new logger_1.Logger().logger.info(message);
    }
}
exports.Output = Output;


/***/ }),

/***/ "./src/validations/json.validator.ts":
/*!*******************************************!*\
  !*** ./src/validations/json.validator.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const validationrule_1 = __webpack_require__(/*! ./validationrule */ "./src/validations/validationrule.ts");
const ruleevent_1 = __webpack_require__(/*! ./ruleevent */ "./src/validations/ruleevent.ts");
const output_1 = __webpack_require__(/*! ../utils/output */ "./src/utils/output.ts");
class JSONValidator {
    static validate(json) {
        let isValid = true;
        const rules = new Array();
        rules.push(new validationrule_1.IsObjectRule(json));
        rules.push(new validationrule_1.HasObjectKeyRule(json));
        rules.push(new validationrule_1.HasIdAttributeRule(json));
        output_1.Output.setInfo('ValidationRule:' +
            'Result'.padStart(60 - 'ValidationRule'.length) +
            'Message'.padStart(80));
        for (const rule of rules) {
            const results = rule.executeValidation();
            for (const result of results.events) {
                output_1.Output.setInfo(results.validationRule +
                    ':' +
                    result.result
                        .toString()
                        .padStart(60 - results.validationRule.length) +
                    result.message.padStart(80));
                if (result.result === ruleevent_1.RuleResultSeverity.ALERT) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }
}
exports.JSONValidator = JSONValidator;


/***/ }),

/***/ "./src/validations/ruleevent.ts":
/*!**************************************!*\
  !*** ./src/validations/ruleevent.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RuleEventList {
    constructor() {
        this.events = new Array();
    }
}
exports.RuleEventList = RuleEventList;
class RuleEvent {
    constructor(result, message) {
        this.message = '';
        this.result = result;
        this.message = message !== undefined ? message : '';
    }
}
exports.RuleEvent = RuleEvent;
var RuleResultSeverity;
(function (RuleResultSeverity) {
    RuleResultSeverity["OK"] = "OK";
    RuleResultSeverity["WARNING"] = "WARNING";
    RuleResultSeverity["ALERT"] = "ALERT";
})(RuleResultSeverity = exports.RuleResultSeverity || (exports.RuleResultSeverity = {}));


/***/ }),

/***/ "./src/validations/validationrule.ts":
/*!*******************************************!*\
  !*** ./src/validations/validationrule.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ruleevent_1 = __webpack_require__(/*! ./ruleevent */ "./src/validations/ruleevent.ts");
class ValidationRule {
    constructor(jsonObject) {
        this.jsonObject = {};
        this.ruleEvents = new Array();
        this.events = new Array();
        this.jsonObject = jsonObject;
    }
    executeValidation() {
        const ruleEventList = new ruleevent_1.RuleEventList();
        const result = this.validate();
        ruleEventList.events = ruleEventList.events.concat(result);
        ruleEventList.validationRule = this.constructor.name;
        return ruleEventList;
    }
}
exports.ValidationRule = ValidationRule;
class IsObjectRule extends ValidationRule {
    validate() {
        let ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
        let message = '';
        try {
            if (this.jsonObject &&
                typeof this.jsonObject === 'object' &&
                this.jsonObject.constructor !== Object) {
                ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
                message = 'root level of json content must be a json object';
            }
        }
        catch (e) {
            ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
            message = e.message;
        }
        this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
        return this.ruleEvents;
    }
}
exports.IsObjectRule = IsObjectRule;
class HasObjectKeyRule extends ValidationRule {
    validate() {
        let ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
        let message = '';
        try {
            if (this.jsonObject && typeof this.jsonObject === 'object') {
                if (Object.keys(this.jsonObject).length === 0) {
                    ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
                    message = 'no root properties found - no endpoints can be created';
                }
            }
        }
        catch (e) {
            ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
            message = e.message;
        }
        this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
        return this.ruleEvents;
    }
}
exports.HasObjectKeyRule = HasObjectKeyRule;
class HasIdAttributeRule extends ValidationRule {
    validate() {
        try {
            if (this.jsonObject &&
                typeof this.jsonObject === 'object' &&
                Object.keys(this.jsonObject).length !== 0) {
                Object.keys(this.jsonObject).forEach(item => {
                    let ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
                    let message = '';
                    if (Array.isArray(this.jsonObject[item]) &&
                        this.jsonObject[item].length > 0 &&
                        !this.jsonObject[item][0].hasOwnProperty('id')) {
                        (ruleSeverity = ruleevent_1.RuleResultSeverity.WARNING),
                            (message =
                                item +
                                    ' is missing id attribute - not possible to do POST, PUT, PATCH');
                    }
                    this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
                });
            }
        }
        catch (e) {
            const ruleSeverityError = ruleevent_1.RuleResultSeverity.ALERT;
            const messageError = e.message;
            this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverityError, messageError));
        }
        return this.ruleEvents;
    }
}
exports.HasIdAttributeRule = HasIdAttributeRule;


/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-list-endpoints":
/*!*****************************************!*\
  !*** external "express-list-endpoints" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-list-endpoints");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "json-server":
/*!******************************!*\
  !*** external "json-server" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("json-server");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "lowdb":
/*!************************!*\
  !*** external "lowdb" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),

/***/ "lowdb-adapter-aws-s3":
/*!***************************************!*\
  !*** external "lowdb-adapter-aws-s3" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb-adapter-aws-s3");

/***/ }),

/***/ "lowdb/adapters/FileAsync":
/*!*******************************************!*\
  !*** external "lowdb/adapters/FileAsync" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileAsync");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pino");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swagger-ui-express");

/***/ })

/******/ })));
//# sourceMappingURL=handler.js.map
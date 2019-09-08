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
var AppConfig = /** @class */ (function () {
    function AppConfig() {
        this.readOnly = false;
        this.enableSwagger = true;
        this.enableApiKeyAuth = false;
        this.jsonFile = 'db.json';
        this.enableJSONValidation = true;
    }
    AppConfig.merge = function (t, u) { return Object.assign({}, t, u); };
    return AppConfig;
}());
exports.AppConfig = AppConfig;


/***/ }),

/***/ "./src/app/cloud.app.ts":
/*!******************************!*\
  !*** ./src/app/cloud.app.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_app_1 = __webpack_require__(/*! ./core.app */ "./src/app/core.app.ts");
var output_1 = __webpack_require__(/*! ../utils/output */ "./src/utils/output.ts");
var CloudApp = /** @class */ (function (_super) {
    __extends(CloudApp, _super);
    function CloudApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.request = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, middlewares, router, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.initializeLayers()];
                    case 1:
                        _a = _b.sent(), middlewares = _a.middlewares, router = _a.router;
                        this.setupServer(middlewares, router);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        if (e_1.code === 'ExpiredToken') {
                            output_1.Output.setError("Please add valid credentials for AWS. Error: " + e_1.message);
                        }
                        else {
                            output_1.Output.setError(e_1.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return CloudApp;
}(core_app_1.CoreApp));
exports.CloudApp = CloudApp;


/***/ }),

/***/ "./src/app/core.app.ts":
/*!*****************************!*\
  !*** ./src/app/core.app.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
var lowdb = __importStar(__webpack_require__(/*! lowdb */ "lowdb"));
var jsonServer = __webpack_require__(/*! json-server */ "json-server");
var json_validator_1 = __webpack_require__(/*! ../validations/json.validator */ "./src/validations/json.validator.ts");
var output_1 = __webpack_require__(/*! ../utils/output */ "./src/utils/output.ts");
var CoreApp = /** @class */ (function () {
    function CoreApp(appConfig, server, storageAdapter, apispec) {
        this.logger = new logger_1.Logger().logger;
        this.appConfig = appConfig;
        this.server = server;
        this.storageAdapter = storageAdapter;
        this.apispec = apispec;
    }
    CoreApp.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setupStorage()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getJSON()];
                    case 2:
                        json = _a.sent();
                        isValid = this.validateJSON(json);
                        if (!isValid) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.setupApp()];
                    case 3:
                        _a.sent();
                        this.setupSwagger(json);
                        return [4 /*yield*/, this.setupRoutes()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        output_1.Output.setError('provided json is not valid - see validation checks');
                        throw Error('provided json is not valid - see validation checks');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CoreApp.prototype.setupStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = CoreApp;
                        return [4 /*yield*/, this.storageAdapter.init()];
                    case 1:
                        _a.storage = _c.sent();
                        _b = CoreApp;
                        return [4 /*yield*/, lowdb.default(CoreApp.storage)];
                    case 2:
                        _b.adapter = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CoreApp.prototype.setupApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, middlewares, router;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.initializeLayers()];
                    case 1:
                        _a = _b.sent(), middlewares = _a.middlewares, router = _a.router;
                        this.setupServer(middlewares, router);
                        return [2 /*return*/];
                }
            });
        });
    };
    CoreApp.prototype.validateJSON = function (db) {
        var isValid = true;
        if (this.appConfig.enableJSONValidation) {
            isValid = json_validator_1.JSONValidator.validate(db);
        }
        return isValid;
    };
    CoreApp.prototype.getJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CoreApp.adapter.getState()];
                    case 1:
                        json = _a.sent();
                        return [2 /*return*/, json];
                }
            });
        });
    };
    CoreApp.prototype.setupSwagger = function (db) {
        if (this.appConfig.enableSwagger) {
            this.apispec.generateSpecification(db, true);
        }
    };
    CoreApp.prototype.setupRoutes = function () {
        var _this = this;
        this.server.use('/reload', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Error('not implemented');
                return [2 /*return*/];
            });
        }); });
    };
    CoreApp.prototype.initializeLayers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, router, middlewares;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(CoreApp.adapter &&
                            Object.entries(CoreApp.adapter).length === 0 &&
                            CoreApp.adapter.constructor === Object)) return [3 /*break*/, 2];
                        _a = CoreApp;
                        return [4 /*yield*/, lowdb.default(CoreApp.storage)];
                    case 1:
                        _a.adapter = _b.sent();
                        _b.label = 2;
                    case 2:
                        router = jsonServer.router(CoreApp.adapter);
                        middlewares = jsonServer.defaults({
                            readOnly: this.appConfig.readOnly,
                        });
                        return [2 /*return*/, { middlewares: middlewares, router: router }];
                }
            });
        });
    };
    CoreApp.prototype.setupServer = function (middlewares, router) {
        if (this.appConfig.enableSwagger) {
            middlewares.splice(middlewares.findIndex(function (x) { return x.name === 'serveStatic'; }), 1);
        }
        this.server.use(middlewares);
        this.server.use('/api', router);
    };
    CoreApp.storage = {};
    CoreApp.adapter = {};
    return CoreApp;
}());
exports.CoreApp = CoreApp;


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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
var CloudServer = /** @class */ (function (_super) {
    __extends(CloudServer, _super);
    function CloudServer(server, core) {
        var _this = _super.call(this, server, core) || this;
        _this.server = server;
        _this.core = core;
        return _this;
    }
    CloudServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.setup()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.core.request()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CloudServer;
}(server_1.CoreServer));
exports.CloudServer = CloudServer;


/***/ }),

/***/ "./src/coreserver/dev.server.ts":
/*!**************************************!*\
  !*** ./src/coreserver/dev.server.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
var DevServer = /** @class */ (function (_super) {
    __extends(DevServer, _super);
    function DevServer(server, core) {
        var _this = _super.call(this, server, core) || this;
        _this.server = server;
        _this.core = core;
        return _this;
    }
    DevServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.setup()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.core.request()];
                    case 2:
                        _a.sent();
                        this.start(this.server, 3000);
                        return [2 /*return*/];
                }
            });
        });
    };
    return DevServer;
}(server_1.CoreServer));
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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
var LocalServer = /** @class */ (function (_super) {
    __extends(LocalServer, _super);
    function LocalServer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.setup()];
                    case 1:
                        _a.sent();
                        this.start(this.server, 3000);
                        return [2 /*return*/];
                }
            });
        });
    };
    return LocalServer;
}(server_1.CoreServer));
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
var logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
var logger = new logger_1.Logger().logger;
var CoreServer = /** @class */ (function () {
    function CoreServer(server, core) {
        this.server = server;
        this.core = core;
    }
    CoreServer.prototype.start = function (server, port) {
        // start the web server
        server.listen(port);
        logger.info("JSON Server is running under port " + port + ". Use http://localhost:" + port + " to access it");
    };
    return CoreServer;
}());
exports.CoreServer = CoreServer;


/***/ }),

/***/ "./src/coreserver/test.server.ts":
/*!***************************************!*\
  !*** ./src/coreserver/test.server.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(/*! ./server */ "./src/coreserver/server.ts");
var TestServer = /** @class */ (function (_super) {
    __extends(TestServer, _super);
    function TestServer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.setup()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestServer;
}(server_1.CoreServer));
exports.TestServer = TestServer;


/***/ }),

/***/ "./src/environment/cloud.environment.ts":
/*!**********************************************!*\
  !*** ./src/environment/cloud.environment.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(/*! ./environment */ "./src/environment/environment.ts");
var CloudEnvironment = /** @class */ (function (_super) {
    __extends(CloudEnvironment, _super);
    function CloudEnvironment() {
        var _this = _super.call(this) || this;
        _this.s3File = process.env.s3File;
        _this.s3Bucket = process.env.s3Bucket;
        _this.basePath = process.env.basePath;
        return _this;
    }
    return CloudEnvironment;
}(environment_1.Environment));
exports.CloudEnvironment = CloudEnvironment;


/***/ }),

/***/ "./src/environment/dev.environment.ts":
/*!********************************************!*\
  !*** ./src/environment/dev.environment.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(/*! ./environment */ "./src/environment/environment.ts");
var dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
var DevEnvironment = /** @class */ (function (_super) {
    __extends(DevEnvironment, _super);
    function DevEnvironment() {
        var _this = _super.call(this) || this;
        dotenv.config();
        _this.s3File = process.env.s3File;
        _this.s3Bucket = process.env.s3Bucket;
        _this.basePath = process.env.basePath;
        return _this;
    }
    return DevEnvironment;
}(environment_1.Environment));
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
var Environment = /** @class */ (function () {
    function Environment() {
        this.basePath = '/';
        this.basePath = '/';
    }
    return Environment;
}());
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var coreserver_1 = __webpack_require__(/*! ./coreserver */ "./src/coreserver/index.ts");
var app_1 = __webpack_require__(/*! ./app */ "./src/app/index.ts");
var storage_1 = __webpack_require__(/*! ./storage */ "./src/storage/index.ts");
var specifications_1 = __webpack_require__(/*! ./specifications */ "./src/specifications/index.ts");
var environment_1 = __webpack_require__(/*! ./environment */ "./src/environment/index.ts");
var ServerFactory = /** @class */ (function () {
    function ServerFactory() {
    }
    ServerFactory.create = function (coreserver, app, environment, storage, appConfig, server) {
        var env = new environment();
        var swagger = new specifications_1.Swagger(server, new specifications_1.SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth), env.basePath);
        var core = new coreserver(server, new app(appConfig, server, storage, swagger));
        return core;
    };
    ServerFactory.createServer = function (type, server, appConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var coreserver, environment, environment, environment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coreserver = {};
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
                            environment = new environment_1.DevEnvironment();
                            coreserver = ServerFactory.create(coreserver_1.DevServer, app_1.CloudApp, environment_1.DevEnvironment, new storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), appConfig, server);
                            break;
                        }
                        case 'offline': {
                            environment = new environment_1.CloudEnvironment();
                            coreserver = ServerFactory.create(coreserver_1.CloudServer, app_1.CloudApp, environment_1.DevEnvironment, new storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), appConfig, server);
                            break;
                        }
                        case 'test': {
                            coreserver = ServerFactory.create(coreserver_1.TestServer, app_1.CoreApp, environment_1.Environment, new storage_1.FileStorageAdapter(appConfig.jsonFile), appConfig, server);
                            break;
                        }
                        default: {
                            environment = new environment_1.CloudEnvironment();
                            coreserver = ServerFactory.create(coreserver_1.CloudServer, app_1.CloudApp, environment_1.CloudEnvironment, new storage_1.S3StorageAdapter(environment.s3Bucket, environment.s3File), appConfig, server);
                            break;
                        }
                    }
                    return [4 /*yield*/, coreserver.init()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, coreserver];
            }
        });
    }); };
    return ServerFactory;
}());
exports.ServerFactory = ServerFactory;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var factory_1 = __webpack_require__(/*! ./factory */ "./src/factory.ts");
var app_config_1 = __webpack_require__(/*! ./app/app.config */ "./src/app/app.config.ts");
exports.startServer = function (environment, server, appConfig) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        factory_1.ServerFactory.createServer(environment, server, appConfig);
        return [2 /*return*/];
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var server, defaultConfig;
    return __generator(this, function (_a) {
        if (__webpack_require__.c[__webpack_require__.s] === module) {
            server = express_1.default();
            defaultConfig = new app_config_1.AppConfig();
            defaultConfig.jsonFile = '../../db.json';
            exports.startServer("development", server, defaultConfig);
        }
        return [2 /*return*/];
    });
}); })();

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
var SwaggerConfig = /** @class */ (function () {
    function SwaggerConfig(readOnly, enableApiKeyAuth) {
        this.readOnly = false;
        this.enableApiKeyAuth = false;
        this.readOnly = readOnly;
        this.enableApiKeyAuth = enableApiKeyAuth;
    }
    return SwaggerConfig;
}());
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
var SwaggerDefGen = /** @class */ (function () {
    function SwaggerDefGen() {
        var _this = this;
        this.outSwagger = '';
        this.tabCount = 0;
        this.indentator = '';
        this.nullType = 'string';
        this.generateDefinitions = function (json) {
            _this.tabCount = 0;
            _this.indentator = '\n';
            // ---- Begin definitions ----
            _this.outSwagger = '{"definitions": {';
            _this.changeIndentation(1);
            // For each object inside the JSON
            Object.keys(json).forEach(function (obj) {
                _this.outSwagger += _this.indentator + "\"" + obj + "\": {";
                _this.conversorSelection(json[obj]);
                _this.outSwagger += _this.indentator + "},";
            });
            // Remove last comma
            _this.outSwagger = _this.outSwagger.substring(0, _this.outSwagger.length - 1);
            // ---- End definitions ----
            _this.changeIndentation(_this.tabCount - 1);
            _this.outSwagger += _this.indentator + "}}";
            var jsonDefinition = JSON.parse(_this.outSwagger);
            return jsonDefinition;
        };
    }
    // ---- Functions definitions ----
    SwaggerDefGen.prototype.changeIndentation = function (count) {
        /*
          Assign 'this.indentator' a string beginning with newline and followed by 'count' tabs
          Updates variable 'tabCount' with the number of tabs used
          Global variables updated:
          -identator
          -tabcount
          */
        var i;
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
    };
    SwaggerDefGen.prototype.isFloatNumber = function (num) {
        return Number(num) === num && num % 1 !== 0;
    };
    SwaggerDefGen.prototype.convertNumber = function (num) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given number
          Global variables updated:
          -this.outSwagger
          */
        if (Number.isInteger(num)) {
            this.outSwagger += this.indentator + "\"type\": \"integer\",";
            if (num < 2147483647 && num > -2147483647) {
                this.outSwagger += this.indentator + "\"format\": \"int32\"";
            }
            else if (Number.isSafeInteger(num)) {
                this.outSwagger += this.indentator + "\"format\": \"int64\"";
            }
            else {
                this.outSwagger += this.indentator + "\"format\": \"unsafe\"";
            }
        }
        else if (this.isFloatNumber(num)) {
            this.outSwagger += this.indentator + "\"format\": \"double\"";
        }
        else {
            this.outSwagger += this.indentator + "\"format\": \"unsafe\"";
        }
        this.outSwagger += "," + this.indentator + "\"example\": \"" + num + "\"";
    };
    // date is ISO8601 format - https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14
    SwaggerDefGen.prototype.convertString = function (str) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given string
          Global variables updated:
          -this.outSwagger
          */
        var regxDate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        var regxDateTime = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]{1,2})?(Z|(\+|-)([0-1][0-9]|2[0-3]):[0-5][0-9])$/;
        this.outSwagger += this.indentator + "\"type\": \"string\"";
        if (regxDateTime.test(str)) {
            this.outSwagger += ',';
            this.outSwagger += this.indentator + "\"format\": \"date-time\"";
        }
        else if (regxDate.test(str)) {
            this.outSwagger += ',';
            this.outSwagger += this.indentator + "\"format\": \"date\"";
        }
        this.outSwagger += "," + this.indentator + "\"example\": \"" + str + "\"";
    };
    SwaggerDefGen.prototype.convertArray = function (obj) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given array
          Global variables updated:
          -this.outSwagger
          */
        this.outSwagger += this.indentator + "\"type\": \"array\",";
        // ---- Begin items scope ----
        this.outSwagger += this.indentator + "\"items\": {";
        this.conversorSelection(obj);
        this.outSwagger += this.indentator + "}";
        // ---- End items scope ----
    };
    SwaggerDefGen.prototype.convertObject = function (obj) {
        /*
          Append to 'this.outSwagger' string with Swagger schema attributes relative to given object
          Global variables updated:
          -this.outSwagger
          */
        var _this = this;
        // Convert null attributes to given type
        if (obj === null) {
            this.outSwagger += this.indentator + "\"type\": \"" + this.nullType + "\",";
            this.outSwagger += this.indentator + "\"format\": \"nullable\"";
            return;
        }
        // ---- Begin properties scope ----
        this.outSwagger += this.indentator + "\"type\": \"object\",";
        this.outSwagger += this.indentator + "\"properties\": {";
        this.changeIndentation(this.tabCount + 1);
        // For each attribute inside that object
        Object.keys(obj).forEach(function (prop) {
            // ---- Begin property type scope ----
            _this.outSwagger += _this.indentator + "\"" + prop + "\": {";
            _this.conversorSelection(obj[prop]);
            _this.outSwagger += _this.indentator + "},";
            // ---- End property type scope ----
        });
        this.changeIndentation(this.tabCount - 1);
        if (Object.keys(obj).length > 0) {
            // At least 1 property inserted
            this.outSwagger = this.outSwagger.substring(0, this.outSwagger.length - 1); // Remove last comma
            this.outSwagger += this.indentator + "}";
        }
        else {
            // No property inserted
            this.outSwagger += ' }';
        }
    };
    SwaggerDefGen.prototype.conversorSelection = function (obj) {
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
            this.outSwagger += this.indentator + "\"type\": \"boolean\"";
        }
        else {
            // not a valid Swagger type
            throw new Error("Property type \"" + typeof obj + "\" not valid for Swagger definitions");
        }
        this.changeIndentation(this.tabCount - 1);
    };
    return SwaggerDefGen;
}());
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
var lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
var listEndpoints = __webpack_require__(/*! express-list-endpoints */ "express-list-endpoints");
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
var PackageInfo = /** @class */ (function () {
    function PackageInfo() {
        this.name = '';
        this.version = '';
        this.title = '';
        this.license = '';
        this.description = '';
    }
    return PackageInfo;
}());
var SwaggerSpec = /** @class */ (function () {
    function SwaggerSpec() {
        var _this = this;
        this.packageJsonPath = process.cwd() + "/package.json";
        this.packageInfo = new PackageInfo();
        this.app = {};
        this.predefinedSpec = {};
        this.spec = {};
        this.getSpec = function (app, predefinedSpec, readOnly, basePath) {
            _this.app = app;
            _this.predefinedSpec = predefinedSpec;
            _this.spec = _this.initSpec(readOnly, basePath);
            return _this.spec;
        };
        this.addSchemaDefitions = function (specificaton, schemaDefinitons) {
            var spec = Object.assign(specificaton, schemaDefinitons);
            Object.keys(spec.paths).forEach(function (path) {
                Object.keys(spec.definitions).forEach(function (definition) {
                    var schemaDef = _this.setSchemaReference(spec, definition);
                    if (path.endsWith(definition)) {
                        if (spec.paths[path].get) {
                            var operation = spec.paths[path].get;
                            Object.assign(spec.paths[path].get, _this.getDefaultSchemaProperties(definition));
                            operation.responses[200] = {
                                schema: { $ref: "#/definitions/" + definition },
                                description: 'successful operation',
                            };
                            operation.parameters = _this.getQueryParameterSchema();
                        }
                        if (spec.paths[path].post) {
                            var operation = spec.paths[path].post;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, _this.getDefaultPostResponses(definition));
                            operation.parameters.push(_this.getDefaultParameterSchema(schemaDef, definition));
                        }
                        if (spec.paths[path].put) {
                            var operation = spec.paths[path].put;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, _this.getDefaultPutResponses(definition));
                            operation.parameters.push(_this.getDefaultParameterSchema(schemaDef, definition));
                        }
                        if (spec.paths[path].patch) {
                            var operation = spec.paths[path].patch;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, _this.getDefaultPutResponses(definition));
                            operation.parameters.push(_this.getDefaultParameterSchema(schemaDef, definition));
                        }
                    }
                    if (path.endsWith(definition + "/{id}")) {
                        if (spec.paths[path].get) {
                            var operation = spec.paths[path].get;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            operation.responses[200] = {
                                schema: { $ref: "#/definitions/" + definition },
                                description: 'successful operation',
                            };
                        }
                        if (spec.paths[path].delete) {
                            var operation = spec.paths[path].delete;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, _this.getDefaultDeleteResponses(definition));
                        }
                        if (spec.paths[path].put) {
                            var operation = spec.paths[path].put;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, _this.getDefaultPutResponses(definition));
                            operation.parameters.push(_this.getDefaultParameterSchema(schemaDef, definition));
                        }
                        if (spec.paths[path].patch) {
                            var operation = spec.paths[path].patch;
                            Object.assign(operation, _this.getDefaultSchemaProperties(definition));
                            Object.assign(operation, _this.getDefaultPutResponses(definition));
                            operation.parameters.push(_this.getDefaultParameterSchema(schemaDef, definition));
                        }
                    }
                });
            });
            return spec;
        };
        this.addAuthentication = function (specificaton, auth) {
            var spec = Object.assign(specificaton.securityDefinitions, auth);
            return spec;
        };
    }
    SwaggerSpec.prototype.updateSpecFromPackage = function (basePath) {
        var newInfo = {
            version: '',
            title: '',
        };
        this.packageInfo = JSON.parse(fs_1.default.readFileSync(this.packageJsonPath, 'UTF-8'));
        if (this.packageInfo.name) {
            newInfo.title = this.packageInfo.name;
        }
        if (this.packageInfo.version) {
            newInfo.version = this.packageInfo.version;
        }
        if (this.packageInfo.license) {
            newInfo.license = { name: this.packageInfo.license };
        }
        newInfo.description = "[Specification JSON](" + basePath + "/api-spec)";
        if (this.packageInfo.description) {
            newInfo.description += "\n\n" + this.packageInfo.description;
        }
        return newInfo;
    };
    SwaggerSpec.prototype.sortObject = function (o) {
        var sorted = {};
        var key;
        var a = Object.keys(o);
        a.sort();
        for (key = 0; key < a.length; key += 1) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    };
    SwaggerSpec.prototype.initSpec = function (readOnly, basePath) {
        var info = this.updateSpecFromPackage(basePath);
        var specification = {
            swagger: '2.0',
            paths: {},
            info: info,
        };
        specification.swagger = '2.0';
        specification.paths = {};
        var excludedRoutes = ['/api/:resource/:id/:nested', '/api/db'];
        var endpoints = listEndpoints(this.app);
        endpoints.forEach(function (endpoint) {
            if (readOnly) {
                for (var i = 0; i < endpoint.methods.length; i += 1) {
                    if (endpoint.methods[i] !== 'GET') {
                        endpoint.methods.splice(i, 1);
                        i -= 1;
                    }
                }
            }
            if (!excludedRoutes.includes(endpoint.path)) {
                var params_1 = new Array();
                var path_1 = endpoint.path;
                var matches = path_1.match(/:([^/]+)/g);
                if (matches) {
                    matches.forEach(function (found) {
                        var paramName = found.substr(1);
                        path_1 = path_1.replace(found, "{" + paramName + "}");
                        params_1.push(paramName);
                    });
                }
                if (!specification.paths[path_1]) {
                    specification.paths[path_1] = {};
                }
                endpoint.methods.forEach(function (m) {
                    specification.paths[path_1][m.toLowerCase()] = {
                        summary: path_1,
                        consumes: ['application/json'],
                        parameters: params_1.map(function (p) { return ({
                            name: p,
                            in: 'path',
                            required: true,
                            type: 'integer',
                        }); }) || [],
                        responses: {},
                    };
                });
            }
        });
        specification.basePath = basePath;
        specification = this.sortObject(lodash_1.default.merge(specification, this.predefinedSpec || {}));
        return specification;
    };
    SwaggerSpec.prototype.setSchemaReference = function (spec, definition) {
        var schemaDef = {};
        if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: "#/definitions/" + definition + "/items" };
        }
        else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: "#/definitions/" + definition };
        }
        return schemaDef;
    };
    SwaggerSpec.prototype.getDefaultParameterSchema = function (schemaDef, definition) {
        return {
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
        };
    };
    SwaggerSpec.prototype.getQueryParameterSchema = function () {
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
    };
    SwaggerSpec.prototype.getDefaultPostResponses = function (definition) {
        return {
            responses: {
                200: {
                    description: 'successful operation',
                    schema: {
                        $ref: "#/definitions/" + definition,
                    },
                },
                400: {
                    description: "Invalid " + definition,
                },
            },
        };
    };
    SwaggerSpec.prototype.getDefaultPutResponses = function (definition) {
        return {
            responses: {
                400: {
                    description: 'Invalid ID supplied',
                },
                404: {
                    description: definition + " not found",
                },
                405: {
                    description: 'Validation exception',
                },
            },
        };
    };
    SwaggerSpec.prototype.getDefaultDeleteResponses = function (definition) {
        return {
            responses: {
                400: {
                    description: 'Invalid ID supplied',
                },
                404: {
                    description: definition + " not found",
                },
            },
        };
    };
    SwaggerSpec.prototype.getDefaultSchemaProperties = function (definition) {
        return {
            produces: ['application/json'],
            tags: [definition],
        };
    };
    return SwaggerSpec;
}());
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
var swaggerUi = __importStar(__webpack_require__(/*! swagger-ui-express */ "swagger-ui-express"));
var swagger_spec_1 = __webpack_require__(/*! ./swagger.spec */ "./src/specifications/swagger/swagger.spec.ts");
var swagger_defgen_1 = __webpack_require__(/*! ./swagger.defgen */ "./src/specifications/swagger/swagger.defgen.ts");
var logger_1 = __webpack_require__(/*! ../../utils/logger */ "./src/utils/logger.ts");
var output_1 = __webpack_require__(/*! ../../utils/output */ "./src/utils/output.ts");
var Swagger = /** @class */ (function () {
    function Swagger(server, config, basePath) {
        var _this = this;
        this.swaggerSpec = new swagger_spec_1.SwaggerSpec();
        this.swaggerDefGen = new swagger_defgen_1.SwaggerDefGen();
        this.logger = new logger_1.Logger().logger;
        this.spec = {};
        this.generateSpecification = function (json, regenerate) {
            if (!_this.spec || regenerate) {
                output_1.Output.setInfo('Init Swagger');
                var swaggerSchemaDefinitions = _this.swaggerDefGen.generateDefinitions(json);
                _this.spec = _this.swaggerSpec.getSpec(_this.server, {}, _this.config.readOnly, _this.basePath);
                var auth = {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'All requests must include the `x-api-key` header containing your account ID.',
                };
                if (_this.config.enableApiKeyAuth) {
                    _this.swaggerSpec.addAuthentication(_this.spec, auth);
                }
                _this.swaggerSpec.addSchemaDefitions(_this.spec, swaggerSchemaDefinitions);
            }
            _this.server.use('/api-spec', function (req, res) {
                res.setHeader('Content-Type', 'application/json');
                res.send(_this.spec);
            });
            _this.server.use('/', swaggerUi.serve, swaggerUi.setup(_this.spec));
        };
        this.server = server;
        this.config = config;
        this.basePath = basePath;
    }
    return Swagger;
}());
exports.Swagger = Swagger;


/***/ }),

/***/ "./src/storage/file.storage.ts":
/*!*************************************!*\
  !*** ./src/storage/file.storage.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FileAsync_1 = __importDefault(__webpack_require__(/*! lowdb/adapters/FileAsync */ "lowdb/adapters/FileAsync"));
var FileStorageAdapter = /** @class */ (function () {
    function FileStorageAdapter(initialFilePath) {
        this.initialFilePath = initialFilePath;
    }
    FileStorageAdapter.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storageAdapter;
            return __generator(this, function (_a) {
                storageAdapter = new FileAsync_1.default(this.initialFilePath);
                return [2 /*return*/, storageAdapter];
            });
        });
    };
    return FileStorageAdapter;
}());
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
var awsAdapter = __webpack_require__(/*! lowdb-adapter-aws-s3 */ "lowdb-adapter-aws-s3");
var S3StorageAdapter = /** @class */ (function () {
    function S3StorageAdapter(s3bucket, s3file) {
        this.s3bucket = s3bucket;
        this.s3file = s3file;
    }
    S3StorageAdapter.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, storageAdapter;
            return __generator(this, function (_a) {
                db = JSON.parse(fs_1.default.readFileSync(this.s3file, 'UTF-8'));
                storageAdapter = new awsAdapter(this.s3file, {
                    defaultValue: db,
                    aws: { bucketName: this.s3bucket },
                });
                return [2 /*return*/, storageAdapter];
            });
        });
    };
    return S3StorageAdapter;
}());
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
var Logger = /** @class */ (function () {
    function Logger() {
        this.logger = __webpack_require__(/*! pino */ "pino")({
            prettyPrint: { colorize: true },
        }, process.stderr);
    }
    return Logger;
}());
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
var logger_1 = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
var Output = /** @class */ (function () {
    function Output() {
    }
    Output.setWarning = function (message) {
        new logger_1.Logger().logger.warning(message);
    };
    Output.setError = function (message) {
        new logger_1.Logger().logger.error(message);
    };
    Output.setInfo = function (message) {
        new logger_1.Logger().logger.info(message);
    };
    return Output;
}());
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
var validationrule_1 = __webpack_require__(/*! ./validationrule */ "./src/validations/validationrule.ts");
var ruleevent_1 = __webpack_require__(/*! ./ruleevent */ "./src/validations/ruleevent.ts");
var output_1 = __webpack_require__(/*! ../utils/output */ "./src/utils/output.ts");
var JSONValidator = /** @class */ (function () {
    function JSONValidator() {
    }
    JSONValidator.validate = function (json) {
        var isValid = true;
        var rules = new Array();
        rules.push(new validationrule_1.IsObjectRule(json));
        rules.push(new validationrule_1.HasObjectKeyRule(json));
        rules.push(new validationrule_1.HasIdAttributeRule(json));
        output_1.Output.setInfo('ValidationRule:' +
            'Result'.padStart(60 - 'ValidationRule'.length) +
            'Message'.padStart(80));
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            var results = rule.executeValidation();
            for (var _a = 0, _b = results.events; _a < _b.length; _a++) {
                var result = _b[_a];
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
    };
    return JSONValidator;
}());
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
var RuleEventList = /** @class */ (function () {
    function RuleEventList() {
        this.events = new Array();
    }
    return RuleEventList;
}());
exports.RuleEventList = RuleEventList;
var RuleEvent = /** @class */ (function () {
    function RuleEvent(result, message) {
        this.message = '';
        this.result = result;
        this.message = message !== undefined ? message : '';
    }
    return RuleEvent;
}());
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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ruleevent_1 = __webpack_require__(/*! ./ruleevent */ "./src/validations/ruleevent.ts");
var ValidationRule = /** @class */ (function () {
    function ValidationRule(jsonObject) {
        this.jsonObject = {};
        this.ruleEvents = new Array();
        this.events = new Array();
        this.jsonObject = jsonObject;
    }
    ValidationRule.prototype.executeValidation = function () {
        var ruleEventList = new ruleevent_1.RuleEventList();
        var result = this.validate();
        ruleEventList.events = ruleEventList.events.concat(result);
        ruleEventList.validationRule = this.constructor.name;
        return ruleEventList;
    };
    return ValidationRule;
}());
exports.ValidationRule = ValidationRule;
var IsObjectRule = /** @class */ (function (_super) {
    __extends(IsObjectRule, _super);
    function IsObjectRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsObjectRule.prototype.validate = function () {
        var ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
        var message = '';
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
    };
    return IsObjectRule;
}(ValidationRule));
exports.IsObjectRule = IsObjectRule;
var HasObjectKeyRule = /** @class */ (function (_super) {
    __extends(HasObjectKeyRule, _super);
    function HasObjectKeyRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HasObjectKeyRule.prototype.validate = function () {
        var ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
        var message = '';
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
    };
    return HasObjectKeyRule;
}(ValidationRule));
exports.HasObjectKeyRule = HasObjectKeyRule;
var HasIdAttributeRule = /** @class */ (function (_super) {
    __extends(HasIdAttributeRule, _super);
    function HasIdAttributeRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HasIdAttributeRule.prototype.validate = function () {
        var _this = this;
        try {
            if (this.jsonObject &&
                typeof this.jsonObject === 'object' &&
                Object.keys(this.jsonObject).length !== 0) {
                Object.keys(this.jsonObject).forEach(function (item) {
                    var ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
                    var message = '';
                    if (Array.isArray(_this.jsonObject[item]) &&
                        _this.jsonObject[item].length > 0 &&
                        !_this.jsonObject[item][0].hasOwnProperty('id')) {
                        (ruleSeverity = ruleevent_1.RuleResultSeverity.WARNING),
                            (message =
                                item +
                                    ' is missing id attribute - not possible to do POST, PUT, PATCH');
                    }
                    _this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
                });
            }
        }
        catch (e) {
            var ruleSeverityError = ruleevent_1.RuleResultSeverity.ALERT;
            var messageError = e.message;
            this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverityError, messageError));
        }
        return this.ruleEvents;
    };
    return HasIdAttributeRule;
}(ValidationRule));
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
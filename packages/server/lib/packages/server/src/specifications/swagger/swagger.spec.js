"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const listEndpoints = require('express-list-endpoints');
const package_json_1 = __importDefault(require("../../../../../package.json"));
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
//# sourceMappingURL=swagger.spec.js.map
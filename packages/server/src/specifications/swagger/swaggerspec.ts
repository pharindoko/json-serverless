import _ from 'lodash';
const listEndpoints = require('express-list-endpoints');
import express from 'express';
import {
  Info,
  Spec,
  Schema,
  ApiKeySecurity,
  Operation,
  QueryParameter,
  BodyParameter,
  Reference,
} from 'swagger-schema-official';
import fs from 'fs';

interface EndPoint {
  path: string;
  methods: string[];
}

class PackageInfo {
  name = '';
  version = '';
  title = '';
  license = '';
  description = '';
}

export class SwaggerSpec {
  private packageJsonPath = `${process.cwd()}/package.json`;
  private packageInfo = new PackageInfo();
  private app = {} as express.Express;
  private predefinedSpec = {} as object;
  private spec = {} as Spec;

  constructor(packageInfoFilePath: string) {
    this.packageJsonPath = packageInfoFilePath;
  }
  private updateSpecFromPackage(basePath: string, specPath: string): Info {
    const newInfo: Info = {
      version: '',
      title: '',
    };
    this.packageInfo = JSON.parse(
      fs.readFileSync(this.packageJsonPath, 'UTF-8')
    ) as PackageInfo;
    if (this.packageInfo.name) {
      newInfo.title = this.packageInfo.name;
    }
    if (this.packageInfo.version) {
      newInfo.version = this.packageInfo.version;
    }
    if (this.packageInfo.license) {
      newInfo.license = { name: this.packageInfo.license };
    }
    newInfo.description = `[Specification JSON](${basePath}${specPath})`;

    if (this.packageInfo.description) {
      newInfo.description += `\n\n${this.packageInfo.description}`;
    }
    return newInfo;
  }
  private sortObject(o: object) {
    const sorted = {};
    let key;
    const a = Object.keys(o);
    a.sort();
    for (key = 0; key < a.length; key += 1) {
      sorted[a[key]] = o[a[key]];
    }
    return sorted;
  }

  initSpec(
    readOnly: boolean,
    basePath: string,
    routePath: string,
    specPath: string
  ) {
    const info = this.updateSpecFromPackage(basePath, specPath);
    let specification: Spec = {
      swagger: '2.0',
      paths: {},
      info,
    };
    specification.swagger = '2.0';
    specification.paths = {};
    const excludedRoutes = [
      routePath + '/:resource/:id/:nested',
      routePath + '/db',
    ];
    const endpoints = listEndpoints(this.app);
    endpoints.forEach((endpoint: EndPoint) => {
      if (readOnly) {
        for (let i = 0; i < endpoint.methods.length; i += 1) {
          if (endpoint.methods[i] !== 'GET') {
            endpoint.methods.splice(i, 1);
            i -= 1;
          }
        }
      }
      if (!excludedRoutes.includes(endpoint.path)) {
        const params = new Array<string>();
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
            parameters:
              params.map(p => ({
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
    specification = this.sortObject(
      _.merge(specification, this.predefinedSpec || {})
    ) as Spec;
    return specification;
  }

  getSpec = (
    app: express.Express,
    predefinedSpec: object,
    readOnly: boolean,
    basePath: string,
    apiRoutePath: string,
    specPath: string
  ) => {
    this.app = app;
    this.predefinedSpec = predefinedSpec;
    this.spec = this.initSpec(readOnly, basePath, apiRoutePath, specPath);
    return this.spec;
  };

  setSchemaReference(spec: Spec, definition: string): Reference {
    let schemaDef = {} as Reference;
    if (spec.definitions![definition].type === 'array') {
      schemaDef = { $ref: `#/definitions/${definition}/items` } as Reference;
    } else if (spec.definitions![definition].type === 'object') {
      schemaDef = { $ref: `#/definitions/${definition}` } as Reference;
    }
    return schemaDef;
  }

  private getDefaultParameterSchema(
    schemaDef: Schema,
    definition: string
  ): BodyParameter {
    return {
      schema: schemaDef,
      in: 'body',
      name: 'body',
      description: definition,
      required: true,
    };
  }

  getQueryParameterSchema(): QueryParameter[] {
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

  private getDefaultPostResponses(definition: string, schemaDef: Reference) {
    return {
      responses: {
        201: {
          description: 'successful operation',
          schema: schemaDef,
        },
        400: {
          description: `invalid ${definition}`,
        },
      },
    };
  }

  private getDefaultPutResponses(definition: string, schemaDef: Reference) {
    return {
      responses: {
        200: {
          description: 'successful operation',
          schema: schemaDef,
        },
        400: {
          description: 'invalid ID supplied',
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

  private getDefaultDeleteResponses(definition: string) {
    return {
      responses: {
        200: {
          description: 'successful operation',
        },
        400: {
          description: 'invalid ID supplied',
        },
        404: {
          description: `${definition} not found`,
        },
      },
    };
  }

  private getDefaultSchemaProperties(definition: string) {
    return {
      produces: ['application/json'],
      tags: [definition],
    };
  }

  addSchemaDefitions = (specification: Spec, schemaDefinitons: Schema) => {
    const spec = Object.assign(specification, schemaDefinitons) as Spec;
    Object.keys(spec.paths).forEach(path => {
      Object.keys(spec.definitions!).forEach((definition: string) => {
        const schemaDef = this.setSchemaReference(spec, definition);
        if (path.endsWith(definition)) {
          if (spec.paths[path].get) {
            const operation = spec.paths[path].get as Operation;
            Object.assign(
              spec.paths[path].get,
              this.getDefaultSchemaProperties(definition)
            );
            operation.responses[200] = {
              schema: { $ref: `#/definitions/${definition}` },
              description: 'successful operation',
            };
            operation.parameters = this.getQueryParameterSchema();
          }
          if (spec.paths[path].post) {
            const operation = spec.paths[path].post as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            Object.assign(
              operation,
              this.getDefaultPostResponses(definition, schemaDef)
            );
            operation.parameters!.push(
              this.getDefaultParameterSchema(schemaDef, definition)
            );
          }
          if (spec.paths[path].put) {
            const operation = spec.paths[path].put as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            Object.assign(
              operation,
              this.getDefaultPutResponses(definition, schemaDef)
            );
            operation.parameters!.push(
              this.getDefaultParameterSchema(schemaDef, definition)
            );
          }
          if (spec.paths[path].patch) {
            const operation = spec.paths[path].patch as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            Object.assign(
              operation,
              this.getDefaultPutResponses(definition, schemaDef)
            );
            operation.parameters!.push(
              this.getDefaultParameterSchema(schemaDef, definition)
            );
          }
        }
        if (path.endsWith(`${definition}/{id}`)) {
          if (spec.paths[path].get) {
            const operation = spec.paths[path].get as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            operation.responses[200] = {
              schema: schemaDef,
              description: 'successful operation',
            };
          }
          if (spec.paths[path].delete) {
            const operation = spec.paths[path].delete as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            Object.assign(
              operation,
              this.getDefaultDeleteResponses(definition)
            );
          }

          if (spec.paths[path].put) {
            const operation = spec.paths[path].put as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            Object.assign(
              operation,
              this.getDefaultPutResponses(definition, schemaDef)
            );
            operation.parameters!.push(
              this.getDefaultParameterSchema(schemaDef, definition)
            );
          }
          if (spec.paths[path].patch) {
            const operation = spec.paths[path].patch as Operation;
            Object.assign(
              operation,
              this.getDefaultSchemaProperties(definition)
            );
            Object.assign(
              operation,
              this.getDefaultPutResponses(definition, schemaDef)
            );
            operation.parameters!.push(
              this.getDefaultParameterSchema(schemaDef, definition)
            );
          }
        }
      });
    });
    return spec;
  };

  addAuthentication = (specification: Spec, auth: ApiKeySecurity) => {
    specification.securityDefinitions = {};
    specification.securityDefinitions['ApiKeyAuth'] = auth;
    specification.security = [{ ApiKeyAuth: [] }];
    return specification;
  };
}

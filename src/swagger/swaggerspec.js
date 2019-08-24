const _ = require('lodash');
const fs = require('fs');

const listEndpoints = require('express-list-endpoints');

const packageJsonPath = `${process.cwd()}/package.json`;
let packageInfo;
let app;
let predefinedSpec = {};


function updateSpecFromPackage(currentSpec) {
  const spec = currentSpec;
  /* eslint global-require : off */
  // eslint-disable-next-line import/no-dynamic-require
  packageInfo = fs.existsSync(packageJsonPath) ? JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) : {};

  spec.info = spec.info || {};

  if (packageInfo.name) {
    spec.info.title = packageInfo.name;
  }
  if (packageInfo.version) {
    spec.info.version = packageInfo.version;
  }
  if (packageInfo.license) {
    spec.info.license = { name: packageInfo.license };
  }

  if (exports.getPackageInfo()) {
    spec.info.description = `[Specification JSON](${exports.getPackageInfo()}/api-spec)`;
  } else {
    spec.info.description = '[Specification JSON](/api-spec)';
  }

  if (packageInfo.description) {
    spec.info.description += `\n\n${packageInfo.description}`;
  }

  if (exports.getPackageInfo()) {
    spec.basePath = exports.getPackageInfo();
  } else {
    spec.basePath = '';
  }

  return spec;
}
function sortObject(o) {
  const sorted = {};
  let key;
  const a = Object.keys(o);
  a.sort();
  for (key = 0; key < a.length; key += 1) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}


function init(readOnly) {
  let spec = { swagger: '2.0', paths: {} };
  const excludedRoutes = ['/api/:resource/:id/:nested', '/api/db'];
  const endpoints = listEndpoints(app);
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
      const params = [];
      let { path } = endpoint;
      const matches = path.match(/:([^/]+)/g);
      if (matches) {
        matches.forEach((found) => {
          const paramName = found.substr(1);
          path = path.replace(found, `{${paramName}}`);
          params.push(paramName);
        });
      }

      if (!spec.paths[path]) {
        spec.paths[path] = {};
      }
      endpoint.methods.forEach((m) => {
        spec.paths[path][m.toLowerCase()] = {
          summary: path,
          consumes: ['application/json'],
          parameters: params.map((p) => ({
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

  spec = updateSpecFromPackage(spec);

  spec = sortObject(_.merge(spec, predefinedSpec || {}));
  return spec;
}


module.exports.getSpec = (App, PredefinedSpec, ReadOnly) => {
  app = App;
  predefinedSpec = PredefinedSpec;
  const spec = init(ReadOnly);
  return spec;
};


module.exports.getPackageInfo = () => (process.env.basePath ? process.env.basePath : '');
function setSchemaReference(spec, definition) {
  let schemaDef = null;
  if (spec.definitions[definition].type === 'array') {
    schemaDef = { $ref: `#/definitions/${definition}/items` };
  } else if (spec.definitions[definition].type === 'object') {
    schemaDef = { $ref: `#/definitions/${definition}` };
  }
  return schemaDef;
}

function getDefaultParameterSchema(schemaDef, definition) {
  return {
    schema: schemaDef,
    in: 'body',
    name: 'body',
    description: definition,
    required: true,
  };
}

function getQueryParameterSchema() {
  return [{
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


function getDefaultPostResponses(definition) {
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

function getDefaultPutResponses(definition) {
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

function getDefaultDeleteResponses(definition) {
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


function getDefaultSchemaProperties(definition) {
  return {
    produces: ['application/json'],
    tags: [
      definition,
    ],
  };
}

module.exports.addSchemaDefitions = (Spec, SchemaDefinitons) => {
  const spec = Object.assign(Spec, SchemaDefinitons);
  Object.keys(spec.paths).forEach((path) => {
    Object.keys(spec.definitions).forEach((definition) => {
      const schemaDef = setSchemaReference(spec, definition);
      if (path.endsWith(definition)) {
        if (spec.paths[path].get) {
          Object.assign(spec.paths[path].get, (getDefaultSchemaProperties(definition)));
          spec.paths[path].get.responses[200] = { schema: { $ref: `#/definitions/${definition}` }, description: 'successful operation' };
          spec.paths[path].get.parameters = getQueryParameterSchema();
        }
        if (spec.paths[path].post) {
          Object.assign(spec.paths[path].post, (getDefaultSchemaProperties(definition)));
          Object.assign(spec.paths[path].post, (getDefaultPostResponses(definition)));
          spec.paths[path].post.parameters.push(getDefaultParameterSchema(schemaDef, definition));
        }
        if (spec.paths[path].put) {
          Object.assign(spec.paths[path].put, (getDefaultSchemaProperties(definition)));
          Object.assign(spec.paths[path].put, (getDefaultPutResponses(definition)));
          spec.paths[path].put.parameters.push(getDefaultParameterSchema(schemaDef, definition));
        }
        if (spec.paths[path].patch) {
          Object.assign(spec.paths[path].patch, (getDefaultSchemaProperties(definition)));
          Object.assign(spec.paths[path].patch, (getDefaultPutResponses(definition)));
          spec.paths[path].patch.parameters.push(getDefaultParameterSchema(schemaDef, definition));
        }
      }
      if (path.endsWith(`${definition}/{id}`)) {
        if (spec.paths[path].get) {
          Object.assign(spec.paths[path].get, (getDefaultSchemaProperties(definition)));
          spec.paths[path].get.responses[200] = { schema: { $ref: `#/definitions/${definition}` }, description: 'successful operation' };
        }
        if (spec.paths[path].delete) {
          Object.assign(spec.paths[path].delete, (getDefaultSchemaProperties(definition)));
          Object.assign(spec.paths[path].delete, (getDefaultDeleteResponses(definition)));
        }

        if (spec.paths[path].put) {
          Object.assign(spec.paths[path].put, (getDefaultSchemaProperties(definition)));
          Object.assign(spec.paths[path].put, (getDefaultPutResponses(definition)));
          spec.paths[path].put.parameters.push(getDefaultParameterSchema(schemaDef, definition));
        }
        if (spec.paths[path].patch) {
          Object.assign(spec.paths[path].patch, (getDefaultSchemaProperties(definition)));
          Object.assign(spec.paths[path].patch, (getDefaultPutResponses(definition)));
          spec.paths[path].patch.parameters.push(getDefaultParameterSchema(schemaDef, definition));
        }
      }
    });
  });
  return spec;
};

module.exports.addAuthentication = (Spec, Auth) => {
  const spec = Object.assign(Spec, Auth);
  spec.security = [];
  Object.keys(spec.securityDefinitions).forEach((sec) => {
    const obj = {};
    obj[sec] = [];
    spec.security.push(obj);
  });
  return spec;
};

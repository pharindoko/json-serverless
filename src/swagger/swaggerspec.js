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

  if (packageInfo.baseUrlPath) {
    spec.info.description = `[Specification JSON](${packageInfo.baseUrlPath}/api-spec) , base url : ${packageInfo.baseUrlPath}`;
  } else {
    packageInfo.baseUrlPath = '';
    spec.info.description = `[Specification JSON](${packageInfo.baseUrlPath}/api-spec)`;
  }

  if (packageInfo.description) {
    spec.info.description += `\n\n${packageInfo.description}`;
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


function init() {
  let spec = { swagger: '2.0', paths: {} };
  console.log('init oas');
  const endpoints = listEndpoints(app);
  endpoints.forEach((endpoint) => {
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
        })) || [],
        responses: {},
      };
    });
  });

  spec = updateSpecFromPackage(spec);

  spec = sortObject(_.merge(spec, predefinedSpec || {}));
  return spec;
}


module.exports.getSpec = (App, PredefinedSpec) => {
  app = App;
  predefinedSpec = PredefinedSpec;
  const spec = init();
  return spec;
};


module.exports.getPackageInfo = () => packageInfo;

module.exports.addSchemaDefitions = (Spec, SchemaDefinitons) => {
  const spec = Object.assign(Spec, SchemaDefinitons);
  Object.keys(spec.paths).forEach((path) => {
    Object.keys(spec.definitions).forEach((definition) => {
      if (path.endsWith(definition)) {
        if (spec.paths[path].get) {
          spec.paths[path].get.responses[200] = { schema: { $ref: `#/definitions/${definition}` } };
        }


        if (spec.paths[path].post) {
          let schemaDef = null;
          if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: `#/definitions/${definition}/items` };
          } else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: `#/definitions/${definition}` };
          }

          spec.paths[path].post.parameters.push({
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
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
            produces: ['application/json'],
            tags: [
              definition,
            ],
          });
        }
        if (spec.paths[path].put) {
          let schemaDef = null;
          if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: `#/definitions/${definition}/items` };
          } else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: `#/definitions/${definition}` };
          }

          spec.paths[path].put.parameters.push({
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
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
            produces: ['application/json'],
            tags: [
              definition,
            ],
          });
        }
        if (spec.paths[path].patch) {
          let schemaDef = null;
          if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: `#/definitions/${definition}/items` };
          } else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: `#/definitions/${definition}` };
          }

          spec.paths[path].patch.parameters.push({
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
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
            produces: ['application/json'],
            tags: [
              definition,
            ],
          });
        }
      }
      if (path.endsWith(`${definition}/{id}`)) {
        if (spec.paths[path].get) {
          spec.paths[path].get.responses[200] = { schema: { $ref: `#/definitions/${definition}` } };
        }
        if (spec.paths[path].delete) {
          spec.paths[path].delete.responses[200] = { schema: { $ref: `#/definitions/${definition}` } };
        }


        let schemaDef = null;
        if (spec.paths[path].put) {
          if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: `#/definitions/${definition}/items` };
          } else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: `#/definitions/${definition}` };
          }

          spec.paths[path].put.parameters.push({
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
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
            produces: ['application/json'],
            tags: [
              definition,
            ],
          });
        }
        if (spec.paths[path].patch) {
          if (spec.definitions[definition].type === 'array') {
            schemaDef = { $ref: `#/definitions/${definition}/items` };
          } else if (spec.definitions[definition].type === 'object') {
            schemaDef = { $ref: `#/definitions/${definition}` };
          }

          spec.paths[path].patch.parameters.push({
            schema: schemaDef,
            in: 'body',
            name: 'body',
            description: definition,
            required: true,
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
            produces: ['application/json'],
            tags: [
              definition,
            ],
          });
        }
      }
    });
  });
  return spec;
};

module.exports.addAuthentication = (Spec, Auth) => {
  const spec = Object.assign(Spec, Auth);
  return spec;
};

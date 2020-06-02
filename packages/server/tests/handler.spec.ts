import request from 'supertest';
import express from 'express';
import { TestServer } from '../src/coreserver';
import { Swagger } from '../src/specifications/swagger/swagger';
import { SwaggerConfig } from '../src/specifications/swagger/swagger.config';
import { FileStorageAdapter } from '../src/storage/file.storage';
import { Environment } from '../src/environment/environment';
import { CoreApp, AppConfig } from '../src/app';

const appConfig = new AppConfig();
appConfig.jsonFile = './tests/resources/validate.json';

const server = express();
const environment = new Environment();
const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  'package.json'
);
const localServer = new TestServer(
  server,
  new CoreApp(
    appConfig,
    server,
    new FileStorageAdapter(appConfig.jsonFile),
    swagger,
    environment
  )
);

beforeAll(async done => {
  await localServer.init();
  done();
});

test('It should response the GET method', async done => {
  const response = await request(localServer.server).get('/ui');
  expect(response.status).toBe(200);
  done();
});

test('It should return a default object', async done => {
  const response = await request(localServer.server).get('/api/posts');
  expect(response.status).toBe(200);
  expect(response.body[0].title).toBe('json-server');
  done();
});

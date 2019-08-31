import request from 'supertest';
import express from 'express';
import { TestServer } from '../src/server/coreserver';
import { AppConfig } from '../src/server/app/app.config';
import fs from 'fs';
import { Swagger } from '../src/server/specifications/swagger/swagger';
import { SwaggerConfig } from '../src/server/specifications/swagger/swagger.config';
import { FileStorageAdapter } from '../src/server/storage/file.storage';
import { Environment } from '../src/server/environment/environment';
import { CoreApp } from '../src/server/app';

const appConfig: AppConfig = JSON.parse(
  fs.readFileSync('./config/appconfig.json', 'UTF-8')
);
const server = express();

const environment = new Environment();
const swagger = new Swagger(server,new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth), environment.basePath);
const localServer = new TestServer(server, new CoreApp(appConfig, server,new FileStorageAdapter(appConfig.jsonFile),swagger));

beforeAll(async (done) => {
  await localServer.init();
  done();
});



describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request(localServer.server).get('/');
    expect(response.status).toBe(200);
    done();
  });
});

describe('Test the root path', () => {
  test('It should return a default object', async (done) => {
    const response = await request(localServer.server).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });
});

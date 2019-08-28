import request from 'supertest';
import express from 'express';
import { TestServer } from '../src/server/coreserver';
import { AppConfig } from '../src/server/config';
import fs from 'fs';
import { LocalApp } from '../src/server/app';
const appConfig: AppConfig = JSON.parse(
  fs.readFileSync('./config/appconfig.json', 'UTF-8')
);
const server = express();
const localServer = new TestServer(server, new LocalApp(appConfig, server));

beforeAll(async (done) => {
  await localServer.init();
  done();
});



describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request(localServer.server).get('/');
    console.log(JSON.stringify(response));
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

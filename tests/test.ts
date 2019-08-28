import request from 'supertest';
import express from 'express';
import { TestServer } from '../src/server/server';


const server = express();
const localServer = new TestServer(server);
(async () => {
  await localServer.init();
})();

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
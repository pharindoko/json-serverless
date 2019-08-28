import request from 'supertest';
import express from 'express';
import { Core } from '../server/core';

const server = express();
const core = new Core(server);

(async () => {
  await core.init();
})();

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(core.server).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Test the root path', () => {
  test('It should return a default object', async () => {
    const response = await request(core.server).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
  });
});

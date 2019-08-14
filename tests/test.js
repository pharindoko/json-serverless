const request = require('supertest');
const app = require('../dist/utils.js');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app.server).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the root path', () => {
  test('It should return a default object', async () => {
    const response = await request(app.server).get('/posts');
    expect(response.statusCode).toBe(200);
    console.log(JSON.stringify(response.body));
    expect(response.body[0].title).toBe('json-server');
  });
});

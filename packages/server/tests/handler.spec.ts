import request from 'supertest';
import express from 'express';
import { TestServer } from '../src/coreserver';
import { Swagger } from '../src/specifications/swagger/swagger';
import { SwaggerConfig } from '../src/specifications/swagger/swagger.config';
import { FileStorageAdapter } from '../src/storage/file.storage';
import { Environment } from '../src/environment/environment';
import { CoreApp, AppConfig } from '../src/app';
import { PublicStrategy, AuthStrategy, ApiKeyStrategy } from '../src/auth';

describe('JSONSLS: Default Settings', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  const localServer = initServerComponents(appConfig);
  let postId: number | undefined;
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
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

  test('It should add a new object', async done => {
    const response = await request(localServer.server)
      .post('/api/posts')
      .send({
        title: 'newTitle',
        author: 'newAuthor',
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('newTitle');
    postId = response.body.id;
    done();
  });

  test('It should update an object', async done => {
    const response = await request(localServer.server)
      .put('/api/posts/' + postId)
      .send({
        title: 'newTitle2',
        author: 'newAuthor',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('newTitle2');
    done();
  });

  test('It should delete an object', async done => {
    const response = await request(localServer.server).delete(
      '/api/posts/' + postId
    );
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
    done();
  });
});

describe('JSONSLS: Change ApiRoute', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.routes.apiRoutePath = '/api/v1';
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
    const response = await request(localServer.server).get('/ui');
    expect(response.status).toBe(200);
    done();
  });
  test('It should return a default object', async done => {
    const response = await request(localServer.server).get('/api/v1/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });
});

describe('JSONSLS: Change swaggerUIRoute', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.routes.swaggerUIRoutePath = '/swagger';
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
    const response = await request(localServer.server).get('/swagger');
    expect(response.status).toBe(200);
    done();
  });
  test('It should return a default object', async done => {
    const response = await request(localServer.server).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });
});

describe('JSONSLS: Change apiSpecRoute', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.routes.swaggerSpecRoutePath = '/specification';
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
    const response = await request(localServer.server).get('/ui');
    expect(response.status).toBe(200);
    done();
  });
  test('It should return the swagger specification', async done => {
    const response = await request(localServer.server).get('/specification');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ basePath: '/', info: {} });
    done();
  });
  test('It should return a default object', async done => {
    const response = await request(localServer.server).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });
});

describe('JSONSLS: Change graphql', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.routes.graphqlRoutePath = '/graph';
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
    const response = await request(localServer.server).get('/ui');
    expect(response.status).toBe(200);
    done();
  });

  test('It should return a default object', async done => {
    const response = await request(localServer.server).post(
      '/graph?query=query%7Bget_api_posts%7Btitle%7D%7D'
    );
    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      data: {
        get_api_posts: [
          {
            title: 'json-server',
          },
        ],
      },
    });
    done();
  });

  test('It should return a default object', async done => {
    const response = await request(localServer.server).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });
});

describe('JSONSLS: Disable Swagger', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.enableSwagger = false;
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should fail to return the swagger ui', async done => {
    const response = await request(localServer.server).get('/ui');
    expect(response.status).toBe(404);
    done();
  });
  test('It should return a default object', async done => {
    const response = await request(localServer.server).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });
});

describe('JSONSLS: ReadOnly', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.readOnly = true;
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
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

  test('It should fail to add a new object', async done => {
    const response = await request(localServer.server)
      .post('/api/posts')
      .send({
        title: 'json-server',
        author: 'typicode',
      });
    expect(response.status).toBe(403);
    done();
  });

  test('It should fail to update an object', async done => {
    const response = await request(localServer.server)
      .put('/api/posts')
      .send({
        id: 1,
        title: 'bad-json-server',
        author: 'typcode',
      });
    expect(response.status).toBe(403);
    done();
  });

  test('It should fail to delete an object', async done => {
    const response = await request(localServer.server).delete('/api/posts/1');
    expect(response.status).toBe(403);
    done();
  });
});

describe('JSONSLS: EnableApiKeyAuth', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';
  appConfig.enableApiKeyAuth = true;
  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('It should return the swagger ui', async done => {
    const response = await request(localServer.server).get('/ui');
    expect(response.status).toBe(200);
    done();
  });

  test('It should return a default object', async done => {
    const response = await request(localServer.server)
      .get('/api/posts')
      .set('authorization', 'apikey');
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe('json-server');
    done();
  });

  test('It should add a new object', async done => {
    const response = await request(localServer.server)
      .post('/api/posts')
      .send({
        title: 'json-server',
        author: 'typicode',
      });
    expect(response.status).toBe(401);
    done();
  });

  test('It should update an object', async done => {
    const response = await request(localServer.server)
      .put('/api/posts')
      .send({
        id: 1,
        title: 'bad-json-server',
        author: 'typcode',
      });

    expect(response.status).toBe(401);
    done();
  });

  test('It should delete an object', async done => {
    const response = await request(localServer.server).delete('/api/posts/1');

    expect(response.status).toBe(401);
    done();
  });

  test('It should fail to add a new object', async done => {
    const response = await request(localServer.server)
      .post('/api/posts')
      .send({
        title: 'json-server',
        author: 'typicode',
      });
    expect(response.status).toBe(401);
    done();
  });

  test('It should fail to update an object', async done => {
    const response = await request(localServer.server)
      .put('/api/posts')
      .send({
        id: 1,
        title: 'bad-json-server',
        author: 'typcode',
      });

    expect(response.status).toBe(401);
    done();
  });

  test('It should fail to delete an object', async done => {
    const response = await request(localServer.server).delete('/api/posts/1');

    expect(response.status).toBe(401);
    done();
  });
});

export function initServerComponents(appConfig: AppConfig) {
  const server = express();
  const environment = new Environment();
  const swagger = new Swagger(
    server,
    new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
    environment.basePath,
    appConfig.routes.apiRoutePath,
    'package.json',
    appConfig.routes.swaggerSpecRoutePath
  );

  const authStrategy: AuthStrategy = appConfig.enableApiKeyAuth
    ? new ApiKeyStrategy(server, 'apikey')
    : new PublicStrategy();

  const localServer = new TestServer(
    server,
    new CoreApp(
      appConfig,
      server,
      new FileStorageAdapter(appConfig.jsonFile),
      swagger,
      environment,
      authStrategy
    )
  );
  return localServer;
}

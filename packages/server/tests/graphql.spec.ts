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
  appConfig.routes.apiRoutePath,
  'package.json',
  appConfig.routes.swaggerSpecRoutePath
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

test('Graphql: It should return a response from posts endpoint', async done => {
  try {
    const response = await request(localServer.server)
      .post(
        '/graphql?query=' + encodeURIComponent('query{get_api_posts{title}}')
      )
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.data['get_api_posts'][0].title).toBe('json-server');
  } catch (error) {
    console.log(error);
  }

  done();
});

test('Graphql: It should create, update and delete a new post item using querystring', async done => {
  try {
    const createReponse = await request(localServer.server)
      .post(
        '/graphql?query=' +
          encodeURIComponent(
            'mutation{post_api_posts(body:{title:"Post", author:"Post"}){title, author, id}}'
          )
      )
      .set('Content-Type', 'application/json');
    expect(createReponse.status).toBe(200);
    expect(createReponse.body.data['post_api_posts'].title).toBe('Post');
    const postId = createReponse.body.data['post_api_posts'].id;
    const updateResponse = await request(localServer.server)
      .post(
        '/graphql?query=' +
          encodeURIComponent(
            'mutation{put_api_posts_id(id:' +
              postId +
              ', body:{id:' +
              postId +
              ', title:"newPost", author:"newAuthor"}){title}}'
          )
      )
      .set('Content-Type', 'application/json');
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data['put_api_posts_id'].title).toBe('newPost');

    const deleteResponse = await request(localServer.server)
      .post(
        '/graphql?query=' +
          encodeURIComponent('mutation{delete_api_posts_id(id:' + postId + ')}')
      )
      .set('Content-Type', 'application/json');
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.data['delete_api_posts_id']).toStrictEqual({});
  } catch (error) {
    console.log(error);
  }

  done();
});

test('Graphql: It should create, update and delete a new post item using body', async done => {
  try {
    const createReponse = await request(localServer.server)
      .post('/graphql')
      .send({
        query:
          'mutation{post_api_posts(body:{title:"Post", author:"Author"}){title, author,id}}',
      })
      .set('Content-Type', 'application/json');
    expect(createReponse.status).toBe(200);
    expect(createReponse.body.data['post_api_posts'].title).toBe('Post');

    const postId = createReponse.body.data['post_api_posts'].id;
    const updateResponse = await request(localServer.server)
      .post('/graphql')
      .send({
        query:
          'mutation{put_api_posts_id(id:' +
          postId +
          ', body:{id: ' +
          postId +
          ', title:"newPost", author:"newAuthor"}){title, author}}',
      })
      .set('Content-Type', 'application/json');
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data['put_api_posts_id'].title).toBe('newPost');

    const deleteResponse = await request(localServer.server)
      .post('/graphql')
      .send({ query: 'mutation{delete_api_posts_id(id: ' + postId + ')}' })
      .set('Content-Type', 'application/json');
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.data['delete_api_posts_id']).toStrictEqual({});
  } catch (error) {
    console.log(error);
  }

  done();
});

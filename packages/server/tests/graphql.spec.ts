import request from 'supertest';
import { AppConfig } from '../src/app';
import { initServerComponents } from './handler.spec';

describe('public graphql calls', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.graphql.json';

  const localServer = initServerComponents(appConfig);
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
              'mutation{post_api_posts(body:{title:"Post1", author:"Author1"}){title, author, id}}'
            )
        )
        .set('Content-Type', 'application/json');
      expect(createReponse.status).toBe(200);
      expect(createReponse.body.data['post_api_posts'].title).toBe('Post1');
      const postId = createReponse.body.data['post_api_posts'].id;
      const updateResponse = await request(localServer.server)
        .post(
          '/graphql?query=' +
            encodeURIComponent(
              'mutation{put_api_posts_id(id:' +
                postId +
                ', body:{id:' +
                postId +
                ', title:"newPost1", author:"newAuthor1"}){title}}'
            )
        )
        .set('Content-Type', 'application/json');
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data['put_api_posts_id'].title).toBe(
        'newPost1'
      );

      const deleteResponse = await request(localServer.server)
        .post(
          '/graphql?query=' +
            encodeURIComponent(
              'mutation{delete_api_posts_id(id:' + postId + ')}'
            )
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
            'mutation{post_api_posts(body:{title:"Post2", author:"Author2"}){title, author,id}}',
        })
        .set('Content-Type', 'application/json');
      expect(createReponse.status).toBe(200);
      expect(createReponse.body.data['post_api_posts'].title).toBe('Post2');

      const postId = createReponse.body.data['post_api_posts'].id;
      const updateResponse = await request(localServer.server)
        .post('/graphql')
        .send({
          query:
            'mutation{put_api_posts_id(id:' +
            postId +
            ', body:{id: ' +
            postId +
            ', title:"newPost2", author:"newAuthor2"}){title, author}}',
        })
        .set('Content-Type', 'application/json');
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data['put_api_posts_id'].title).toBe(
        'newPost2'
      );

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
});

describe('apikey secured graphql calls', () => {
  const apikey = 'apikey';
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.graphql.apikey.json';
  appConfig.enableApiKeyAuth = false;
  const localServer = initServerComponents(appConfig);
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
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
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
              'mutation{post_api_posts(body:{title:"Post3", author:"Post3"}){title, author, id}}'
            )
        )
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
      expect(createReponse.status).toBe(200);
      expect(createReponse.body.data['post_api_posts'].title).toBe('Post3');
      const postId = createReponse.body.data['post_api_posts'].id;
      const updateResponse = await request(localServer.server)
        .post(
          '/graphql?query=' +
            encodeURIComponent(
              'mutation{put_api_posts_id(id:' +
                postId +
                ', body:{id:' +
                postId +
                ', title:"newPost3", author:"newAuthor3"}){title}}'
            )
        )
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data['put_api_posts_id'].title).toBe(
        'newPost3'
      );

      const deleteResponse = await request(localServer.server)
        .post(
          '/graphql?query=' +
            encodeURIComponent(
              'mutation{delete_api_posts_id(id:' + postId + ')}'
            )
        )
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
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
            'mutation{post_api_posts(body:{title:"Post4", author:"Author4"}){title, author,id}}',
        })
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
      expect(createReponse.status).toBe(200);
      expect(createReponse.body.data['post_api_posts'].title).toBe('Post4');

      const postId = createReponse.body.data['post_api_posts'].id;
      const updateResponse = await request(localServer.server)
        .post('/graphql')
        .send({
          query:
            'mutation{put_api_posts_id(id:' +
            postId +
            ', body:{id: ' +
            postId +
            ', title:"newPost4", author:"newAuthor4"}){title, author}}',
        })
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data['put_api_posts_id'].title).toBe(
        'newPost4'
      );

      const deleteResponse = await request(localServer.server)
        .post('/graphql')
        .send({ query: 'mutation{delete_api_posts_id(id: ' + postId + ')}' })
        .set('Content-Type', 'application/json')
        .set('authorization', apikey);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.data['delete_api_posts_id']).toStrictEqual({});
    } catch (error) {
      console.log(error);
      throw error;
    }

    done();
  });
});

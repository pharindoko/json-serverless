'use strict';
var s3storage = require('./s3');
var serverless = require('serverless-http');
var jsonServer = require('json-server');
const low = require('lowdb')
var server = jsonServer.create()
const storage = low(new s3storage())
var router = jsonServer.router(storage)
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

server.start = function () {
  // start the web server
  return server.listen(3000, () => {
    console.log('JSON Server is running')
  });
};

if (require.main === module) {
  server.start();
}
const serverlessApp = serverless(server);

export {server as default,  serverlessApp as handler};
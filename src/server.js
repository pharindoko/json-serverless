'use strict';
const low = require('lowdb');
const s3Storage = require('lowdb-s3');
var serverless = require('serverless-http');
var jsonServer = require('json-server');
const storage = new s3Storage(process.env.S3BUCKET, process.env.S3FILE);

var server = jsonServer.create();
low(storage)
  .then(db => {
    var router = jsonServer.router(db)
    var middlewares = jsonServer.defaults({readOnly: process.env.READONLY});
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
    
    
    
  });

  const serverlessApp = serverless(server);
  export {server as default,  serverlessApp as handler};




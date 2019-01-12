'use strict';
const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3')
var serverless = require('serverless-http');
var jsonServer = require('json-server');

if (process.env.NODE_ENV === 'local') {
  console.log('load variables from .env file');
  require('dotenv').load();
}

console.log('S3FILE: ' + process.env.S3FILE);
console.log('S3BUCKET: ' + process.env.S3BUCKET);
console.log('READONLY: ' + process.env.READONLY);
var server = jsonServer.create();
const storage = new AwsAdapter(process.env.S3FILE, { defaultValue: {"basic": {"hello":"world"}}, aws: { bucketName: process.env.S3BUCKET } });

const request = async () => {
  const adapter = await low(storage);
  console.log('storage initialized');
  console.log('storage: ' + JSON.stringify(adapter));
  var router = jsonServer.router(adapter)
  var middlewares = jsonServer.defaults();
  server.use(middlewares);
  server.use(router);
  server.start = function () {
    // start the web server
    const port = 3000;
    return server.listen(port, () => {
      console.log('JSON Server is running under port 3000. Use http://localhost:'+ port + ' to access it')
    });
  };
  
  if (require.main === module) {
    server.start();
  }

}

const handler = serverless(server);
module.exports.handler = async (event, context) => {
  await request();
  return await handler(event, context);
};

request();

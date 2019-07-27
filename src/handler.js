require('@babel/polyfill');
const serverless = require('serverless-http');
const logger = require('pino')({
  prettyPrint: true,
}, process.stderr);
const app = require('./utils');

const start = (server, port) => {
  // start the web server
  server.listen(port, () => {
    logger.info(`JSON Server is running under port ${port}. Use http://localhost:${port} to access it`);
  });
};

const handler = serverless(app.server);
module.exports.handler = async (event, context) => {
  await app.request();
  const result = await handler(event, context);
  return result;
};
if (require.main === module) {
  if (process.env.NODE_ENV !== 'local') {
    app.request();
  } else {
    start(app.server, 3000);
  }
}

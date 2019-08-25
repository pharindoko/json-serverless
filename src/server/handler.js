require('@babel/polyfill');
const serverless = require('serverless-http');
const { logger } = require('./logger');
const core = require('./core');

function start(server, port) {
  // start the web server
  server.listen(port);
  logger.info(`JSON Server is running under port ${port}. Use http://localhost:${port} to access it`);
}

const handler = serverless(core.server);
module.exports.handler = async (event, context) => {
  await core.request();
  const result = await handler(event, context);
  return result;
};
(async () => {
  await core.init();
  if (require.main === module) {
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'debug') {
      start(core.server, 3000);
    } else if (process.env.NODE_ENV === 'development') {
      await core.request();
      start(core.server, 3000);
    } else {
      await core.request();
    }
  }
})();

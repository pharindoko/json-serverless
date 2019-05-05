

const fs = require('fs');
const low = require('lowdb');
const AwsAdapter = require('lowdb-adapter-aws-s3');
const serverless = require('serverless-http');
const jsonServer = require('json-server');
const dotenv = require('dotenv');
const dynamicMiddleware = require('express-dynamic-middleware');

const defaultDB = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const logger = require('pino')({
  prettyPrint: true,
}, process.stderr);

if (process.env.NODE_ENV === 'local') {
  logger.info('load variables from .env file');
  // eslint-disable-next-line global-require
  dotenv.config();
}

logger.info(`S3FILE: ${process.env.S3FILE}`);
logger.info(`S3BUCKET: ${process.env.S3BUCKET}`);
logger.info(`READONLY: ${process.env.READONLY}`);
const server = jsonServer.create();

const storage = new AwsAdapter(process.env.S3FILE,
  {
    defaultValue: defaultDB,
    aws:
    { bucketName: process.env.S3BUCKET },
  });

const request = async () => {
  try {
    const adapter = await low(storage);
    logger.info('storage initialized');
    let router = jsonServer.router(adapter);
    let dynamicRouter = dynamicMiddleware.create(router);
    const middlewares = jsonServer.defaults({ readOnly: process.env.READONLY === 'true' });

    server.use(middlewares);

    server.use(jsonServer.bodyParser);
    // eslint-disable-next-line consistent-return
    server.use(async (req, res, next) => {
      logger.info('reload/');
      if (req.method === 'POST' && req.path === '/reload') {
        if (req.body && Object.keys(req.body).length) {
          logger.info(`reload: req.body: ${JSON.stringify(req.body)}`);
          router.db.setState(req.body);
          await router.db.write();
          logger.info('reload: written to database');
        } else {
          logger.info('reload: reload database');
          let state = await router.db.read();
          if (!state && Object.keys(state).length) {
            state = defaultDB;
          }
          logger.info(`reload: state: ${JSON.stringify(state)}`);
          router.db = state;
        }
        dynamicRouter.unuse(router);
        router = jsonServer.router(router.db);
        dynamicRouter = dynamicMiddleware.create(router);
        server.use(dynamicRouter.handle());
        return res.sendStatus(200);
      }
      next();
    });
    server.use(dynamicRouter.handle());
  } catch (e) {
    if (e.code === 'ExpiredToken') {
      logger.error(`Please add valid credentials for AWS. Error: ${e.message}`);
    } else {
      logger.error(e.code);
    }
  }
};


const handler = serverless(server);
module.exports.handler = async (event, context) => {
  await request();
  await handler(event, context);
};

function start() {
  // start the web server
  const port = 3000;
  return server.listen(port, () => {
    logger.info(`JSON Server is running under port 3000. Use http://localhost:${port} to access it`);
  });
}

if (require.main === module) {
  request();
  start();
}

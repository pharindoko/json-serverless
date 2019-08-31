export class Logger {
  logger = require('pino')(
    {
      prettyPrint: true,
    },
    process.stderr
  );
}

export class Logger {
  logger = require('pino')(
    {
      prettyPrint: { colorize: true },
    },
    process.stderr
  );
}

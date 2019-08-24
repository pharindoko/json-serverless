const logger = require('pino')({
  prettyPrint: true,
}, process.stderr);

module.exports.logger = logger;

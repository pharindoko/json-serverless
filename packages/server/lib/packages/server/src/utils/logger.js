"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor() {
        this.logger = require('pino')({
            prettyPrint: { colorize: true },
        }, process.stderr);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map
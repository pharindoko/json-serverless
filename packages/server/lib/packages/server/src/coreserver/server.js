"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const logger = new logger_1.Logger().logger;
class CoreServer {
    constructor(server, core) {
        this.server = server;
        this.core = core;
    }
    start(server, port) {
        // start the web server
        server.listen(port);
        logger.info(`JSON Server is running under port ${port}. Use http://localhost:${port} to access it`);
    }
}
exports.CoreServer = CoreServer;
//# sourceMappingURL=server.js.map
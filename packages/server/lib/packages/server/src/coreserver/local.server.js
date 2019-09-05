"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class LocalServer extends server_1.CoreServer {
    async init() {
        await this.core.setup();
        this.start(this.server, 3000);
    }
}
exports.LocalServer = LocalServer;
//# sourceMappingURL=local.server.js.map
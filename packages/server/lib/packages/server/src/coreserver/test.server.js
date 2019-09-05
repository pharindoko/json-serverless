"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class TestServer extends server_1.CoreServer {
    async init() {
        await this.core.setup();
    }
}
exports.TestServer = TestServer;
//# sourceMappingURL=test.server.js.map
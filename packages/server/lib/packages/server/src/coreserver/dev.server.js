"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class DevServer extends server_1.CoreServer {
    constructor(server, core) {
        super(server, core);
        this.server = server;
        this.core = core;
    }
    async init() {
        await this.core.setup();
        await this.core.request();
        this.start(this.server, 3000);
    }
}
exports.DevServer = DevServer;
//# sourceMappingURL=dev.server.js.map
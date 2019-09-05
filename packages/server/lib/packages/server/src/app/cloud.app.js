"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_app_1 = require("./core.app");
const output_1 = require("../utils/output");
class CloudApp extends core_app_1.CoreApp {
    constructor() {
        super(...arguments);
        this.request = async () => {
            try {
                const { middlewares, router } = await this.initializeLayers();
                this.setupServer(middlewares, router);
            }
            catch (e) {
                if (e.code === 'ExpiredToken') {
                    output_1.Output.setError(`Please add valid credentials for AWS. Error: ${e.message}`);
                }
                else {
                    output_1.Output.setError(e.message);
                }
            }
        };
    }
}
exports.CloudApp = CloudApp;
//# sourceMappingURL=cloud.app.js.map
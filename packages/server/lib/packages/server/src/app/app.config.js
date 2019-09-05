"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    constructor() {
        this.readOnly = false;
        this.enableSwagger = true;
        this.enableApiKeyAuth = false;
        this.jsonFile = 'db.json';
        this.enableJSONValidation = true;
    }
}
exports.AppConfig = AppConfig;
AppConfig.merge = (t, u) => Object.assign({}, t, u);
//# sourceMappingURL=app.config.js.map
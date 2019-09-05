"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
class Output {
    static setWarning(message) {
        new logger_1.Logger().logger.warning(message);
    }
    static setError(message) {
        new logger_1.Logger().logger.error(message);
    }
    static setInfo(message) {
        new logger_1.Logger().logger.info(message);
    }
}
exports.Output = Output;
//# sourceMappingURL=output.js.map
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUi = __importStar(require("swagger-ui-express"));
const swagger_spec_1 = require("./swagger.spec");
const swagger_defgen_1 = require("./swagger.defgen");
const logger_1 = require("../../utils/logger");
const output_1 = require("../../utils/output");
class Swagger {
    constructor(server, config, basePath) {
        this.swaggerSpec = new swagger_spec_1.SwaggerSpec();
        this.swaggerDefGen = new swagger_defgen_1.SwaggerDefGen();
        this.logger = new logger_1.Logger().logger;
        this.spec = {};
        this.generateSpecification = (json, regenerate) => {
            if (!this.spec || regenerate) {
                output_1.Output.setInfo('Init Swagger');
                const swaggerSchemaDefinitions = this.swaggerDefGen.generateDefinitions(json);
                this.spec = this.swaggerSpec.getSpec(this.server, {}, this.config.readOnly, this.basePath);
                const auth = {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'All requests must include the `x-api-key` header containing your account ID.',
                };
                if (this.config.enableApiKeyAuth) {
                    this.swaggerSpec.addAuthentication(this.spec, auth);
                }
                this.swaggerSpec.addSchemaDefitions(this.spec, swaggerSchemaDefinitions);
            }
            this.server.use('/api-spec', (req, res) => {
                res.setHeader('Content-Type', 'application/json');
                res.send(this.spec);
            });
            this.server.use('/', swaggerUi.serve, swaggerUi.setup(this.spec));
        };
        this.server = server;
        this.config = config;
        this.basePath = basePath;
    }
}
exports.Swagger = Swagger;
//# sourceMappingURL=swagger.js.map
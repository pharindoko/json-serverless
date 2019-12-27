"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const json_serverless_lib_1 = require("json-serverless-lib");
const express_1 = tslib_1.__importDefault(require("express"));
class Run extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Run);
        const server = express_1.default();
        const defaultConfig = new json_serverless_lib_1.AppConfig();
        defaultConfig.jsonFile = args.file;
        if (args.file && flags.env) {
            json_serverless_lib_1.startServer(flags.env, server, defaultConfig);
        }
    }
}
exports.Run = Run;
Run.description = 'describe the command here';
Run.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with no value (-e, --env)
    env: command_1.flags.string({
        char: 'e',
        description: 'environment',
        hidden: false,
        options: ['development', 'local'],
        default: 'local',
        required: false,
    })
};
Run.args = [
    {
        name: 'file',
        required: true,
        description: 'path of JSON file',
        hidden: false,
    }
];

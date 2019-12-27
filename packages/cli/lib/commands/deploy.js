"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const Listr = require("listr");
class Deploy extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Deploy);
        const tasks = new Listr([
            {
                title: 'Deploy',
                task: async () => {
                    console.log("currentDirectory: " + process.cwd());
                    console.log(this.config.root + "/serverless.yml");
                    const exec = require('child_process').exec;
                    const slsProcess = exec('sls deploy --file ' + this.config.root + "/serverless.yml");
                    slsProcess.stdout.pipe(process.stdout);
                    ;
                    slsProcess.on('exit', () => {
                        Promise.resolve();
                    });
                }
            },
            {
                title: 'Done',
                task: () => {
                    console.log('done');
                }
            }
        ]);
        tasks.run().catch(err => {
            console.error(err);
        });
    }
}
exports.Deploy = Deploy;
Deploy.description = 'describe the command here';
Deploy.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with no value (-f, --force)
    name: command_1.flags.string({
        char: 'n',
        description: 'name of the api/stack',
        hidden: false,
        multiple: false,
        default: 'json-serverless',
        required: false,
    }),
    readonly: command_1.flags.boolean({
        char: 'r',
        description: 'set api to readonly (true) or writeable (false)',
        hidden: false,
        default: false,
        required: false,
    }),
    swagger: command_1.flags.boolean({
        char: 's',
        description: 'activate swagger ui support',
        hidden: false,
        default: true,
        required: false,
    }),
    apikeyauth: command_1.flags.boolean({
        char: 'a',
        description: 'require api key authentication to access api',
        hidden: false,
        default: false,
        required: false,
    })
};
Deploy.args = [
    {
        name: 'file',
        required: true,
        description: 'path of JSON file',
        hidden: false,
    }
];

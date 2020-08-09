import fs from 'fs-extra';
import * as path from 'path';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import figlet from 'figlet';
import chalk from 'chalk';
import cli from 'cli-ux';
import { AppConfig } from 'json-serverless-lib';
export class Helpers {
  static readFileSync(directoryPath: string): string {
    const normalizedPath = path.normalize(directoryPath);
    if (!fs.existsSync(normalizedPath)) {
      throw new Error('file' + normalizedPath + ' does not exist');
    } else {
      const file = fs.readFileSync(normalizedPath, 'UTF-8');
      return file;
    }
  }

  static validateFile(filePath: string): string {
    if (!path.isAbsolute(filePath)) {
      filePath = path.normalize(process.cwd() + '/' + filePath);
    }
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(
          'JSONFile could not be found - please check if the path is correct'
        );
      }
      return filePath;
    } catch (err) {
      throw new Error(err);
    }
  }

  static validateStackFolder(directoryPath: string): void {
    try {
      if (fs.existsSync(directoryPath)) {
        throw new Error(
          'Cannot create folder ' +
            directoryPath +
            ' for the stack. folder already exists - please delete or use update-stack method'
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static changeDirectory(directoryPath: string): void {
    try {
      if (!fs.existsSync(path.resolve(process.cwd(), directoryPath))) {
        throw new Error(
          'Cannot find path ' +
            path.resolve(process.cwd(), directoryPath) +
            '- please verify that this path exists.'
        );
      } else {
        process.chdir(path.resolve(process.cwd(), directoryPath));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static isJSONServerlessDirectory(directoryPath: string): void {
    try {
      const serverlessFile = path.normalize(directoryPath + '/serverless.yml');
      const appConfigJsonFile = path.normalize(
        directoryPath + '/config/appconfig.json'
      );
      const serverlessConfigFile = path.normalize(
        directoryPath + '/config/serverlessconfig.json'
      );
      if (!fs.existsSync(serverlessFile)) {
        throw new Error('file' + serverlessFile + ' does not exist');
      }

      if (!fs.existsSync(appConfigJsonFile)) {
        throw new Error('file' + appConfigJsonFile + ' does not exist');
      }

      if (!fs.existsSync(serverlessConfigFile)) {
        throw new Error('file' + serverlessConfigFile + ' does not exist');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static async executeChildProcess(
    command: string,
    options: {},
    stdout = true
  ) {
    try {
      const childProcess = await exec(command, options);
      if (stdout) {
        console.log('stdout:', childProcess.stdout);
      }
      console.log('stderr:', childProcess.stderr);
      Promise.resolve();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async executeChildProcess2(
    command: string,
    options: {},
    stdout = true
  ): Promise<string> {
    try {
      const childProcess = await exec(command, options);
      if (stdout) {
        return Promise.resolve(childProcess.stdout);
      }
      return Promise.reject(childProcess.stderr);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async copyFiles(source: string, destination: string) {
    try {
      if (!fs.existsSync(source)) {
        throw new Error(
          'Cannot copy files - sourcefolder ' + source + ' does not exist'
        );
      }
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  static async generateLogo(text: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      figlet.text(
        text,
        {
          font: 'ANSI Shadow',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        },
        function (err, data) {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });
  }

  static createDir(dir: string) {
    const fs = require('fs');
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (e) {
      console.log('createDir: An error occurred.' + e);
    }
  }

  static removeDir(dir: string) {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((file, index) => {
        const curPath = path.join(dir, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          Helpers.removeDir(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(dir);
    }
  }
  static updatePackageJson(
    directoryPath: string,
    name: string,
    description: string
  ) {
    const packageJsonFile = path.normalize(directoryPath + '/package.json');
    if (!fs.existsSync(packageJsonFile)) {
      throw new Error('file' + packageJsonFile + ' does not exist');
    } else {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'UTF-8'));
      packageJson.name = name;
      packageJson.description = description;
      fs.writeFileSync(
        path.normalize(packageJsonFile),
        JSON.stringify(packageJson, null, 2),
        'utf-8'
      );
    }
  }
  static s3BucketValidator(input: string): any {
    const regexPattern =
      '(?=^.{3,63}$)(?!^(d+.)+d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]).)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$)';
    const regex = new RegExp(regexPattern);
    const test = regex.test(input);
    if (!test) {
      return 'Sorry this is not valid \n=> allowed pattern: ' + regexPattern;
    }
    return true;
  }

  static descriptionValidator(input: string): any {
    const regexPattern = '^[^`~!@#$%^*+={}[]|\\:;“’<>?๐฿]*$';
    const regex = new RegExp(regexPattern);
    const test = regex.test(input);
    if (!test) {
      return (
        'Sorry this is not valid - no special characters are allowed \n=> allowed pattern: ' +
        regexPattern
      );
    }
    return true;
  }

  static createCLIOutput(
    slsinfo: string,
    appConfig: AppConfig,
    stage: string,
    s3bucketPath?: string,
    apiKeyValue?: string
  ) {
    const outputJson = Helpers.parseServerlessInfo(slsinfo);
    console.log();
    console.log(
      'The Api ' + outputJson.service + ' has been successfully deployed'
    );
    console.log();
    console.log('Further details:');
    cli.table(
      [
        {
          text: `${chalk.blueBright('Stage')}`,
          link: outputJson.stage,
        },
        {
          text: `${chalk.blueBright('Region')}`,
          link: outputJson.region,
        },
        {
          text: `${chalk.blueBright('Cloudformation Stack')}`,
          link: outputJson.stack,
        },
      ],
      { text: { minWidth: 30 }, link: { minWidth: 20 } },
      { 'no-header': true }
    );

    if (s3bucketPath)
      cli.table(
        [
          {
            text: `${chalk.blueBright('S3 Bucket')}`,
            link: s3bucketPath,
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );

    console.log();
    console.log();
    if (apiKeyValue) {
      console.log(
        `${chalk.green(
          'Please use the following Apikey in your header to authenticate: {"authorization":"apiKeyValue"}'
        )} ` + apiKeyValue
      );
    }
    console.log();
    console.log();

    if (appConfig.enableSwagger) {
      cli.table(
        [
          {
            text: `${chalk.blueBright('Swagger UI')}`,
            link: outputJson.endpoints + appConfig.routes.swaggerUIRoutePath,
          },
          {
            text: `${chalk.blueBright('GraphiQL')}`,
            link: outputJson.endpoints + appConfig.routes.graphqlRoutePath,
          },
          {
            text: `${chalk.blueBright('Swagger Specification')}`,
            link: outputJson.endpoints + appConfig.routes.swaggerSpecRoutePath,
          },
          {
            text: `${chalk.blueBright('API Routes')}`,
            link:
              outputJson.endpoints +
              appConfig.routes.apiRoutePath +
              '/{routes}',
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );
    } else {
      cli.table(
        [
          {
            text: `${chalk.blueBright('API Routes')}`,
            link:
              outputJson.endpoints +
              appConfig.routes.apiRoutePath +
              '/{routes}',
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );
    }

    console.log();
    console.log();
  }

  private static parseServerlessInfo(slsinfo: string) {
    const rows = JSON.stringify(slsinfo).split('\\n') as any[];
    const createKeyValues = rows.map((x, i, rows) => {
      if (x.startsWith('  ANY -')) {
        x = {
          name: x.split(' - ')[0],
          value: x.split(' - ')[1],
        };
      } else {
        x = {
          name: x.split(':')[0],
          value: x.split(':')[1],
        };
      }
      return x;
    });

    const outputJson = createKeyValues
      .map((x, i, rows) => {
        if (rows[i + 1] && rows[i + 1].name.startsWith('  ')) {
          x.value = rows[i + 1].value;
        }
        if (x && x.name.startsWith('  ')) {
          return null;
        }
        if (x && x.name) {
          x.name = x.name.replace(/\s/g, '');
        }
        if (x && x.value) {
          x.value = x.value.replace(/\s/g, '');
        }

        return x;
      })
      .filter(
        (item) =>
          item != null &&
          item.hasOwnProperty('value') &&
          item.value != undefined
      )
      .reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }),
        {}
      );
    return outputJson;
  }
}

import fs from 'fs-extra';
import * as path from 'path';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import figlet from 'figlet';

export class Helpers {
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
  static async generateLogo(text:string) {
    return await new Promise((resolve,reject) => {figlet.text(text, {
      font: 'Stellar',
      horizontalLayout: 'default',
      verticalLayout: 'default'
  }, function(err, data) {
      if (err) {
        return reject(err);
      }
      console.log(data);
      return resolve();
  });
});
  }
}

import fs from 'fs';
import { CoreApp } from './app';
import FileAsync from 'lowdb/adapters/FileAsync';
export class LocalApp extends CoreApp {
  async setupStorage(): Promise<void> {
    const db = JSON.parse(
      fs.readFileSync(this.appConfig.jsonFile as string, 'UTF-8')
    );
    CoreApp.storage = new FileAsync(this.appConfig.jsonFile);
  }

  async setupApp(): Promise<object> {
    this.logger.info('start locals environment');
    const { middlewares, router, adapter } = await this.initializeLayers();
    this.setupServer(middlewares, router);
    const json = await adapter.getState();
    return json;
  }
}

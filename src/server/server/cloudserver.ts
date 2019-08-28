import { Server } from './server';

export class CloudServer extends Server {
  async init(): Promise<void> {
    await this.core.init();
    await this.core.request();
  }
}

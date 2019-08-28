import { Server } from './server';

export class DevServer extends Server {
  async init(): Promise<void> {
    await this.core.init();
    await this.core.request();
    this.start(this.server, 3000);
  }
}

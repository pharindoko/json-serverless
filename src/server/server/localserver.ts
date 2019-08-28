import { Server } from './server';

export class LocalServer extends Server {
  async init(): Promise<void> {
    await this.core.init();
    this.start(this.server, 3000);
  }
}

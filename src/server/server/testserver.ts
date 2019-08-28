import { Server } from './server';

export class TestServer extends Server {
  async init(): Promise<void> {
    await this.core.init();
  }
}

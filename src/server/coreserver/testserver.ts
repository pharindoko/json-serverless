import { CoreServer } from './server';

export class TestServer extends CoreServer {
  async init(): Promise<void> {
    await this.core.setup();
  }
}

import { CoreServer } from './server';

export class LocalServer extends CoreServer {
  async init(): Promise<void> {
    await this.core.setup();
    this.start(this.server, 3000);
  }
}

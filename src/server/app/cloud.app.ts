import { CoreApp } from './core.app';
import { Output } from '../utils/output';
export class CloudApp extends CoreApp {
  request = async () => {
    try {
      const { middlewares, router } = await this.initializeLayers();
      this.setupServer(middlewares, router);
    } catch (e) {
      if (e.code === 'ExpiredToken') {
        Output.setError(
          `Please add valid credentials for AWS. Error: ${e.message}`
        );
      } else {
        Output.setError(e.message);
      }
    }
  };
}

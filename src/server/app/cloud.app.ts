import { CoreApp } from './core.app';

export class CloudApp extends CoreApp {
  request = async () => {
    try {
      const { middlewares, router } = await this.initializeLayers();
      this.setupServer(middlewares, router);
    } catch (e) {
      if (e.code === 'ExpiredToken') {
        this.logger.error(
          `Please add valid credentials for AWS. Error: ${e.message}`
        );
      } else {
        this.logger.error(e);
      }
    }
  };
}

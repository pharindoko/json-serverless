import { CoreApp } from './core.app';
import { Output } from '../utils/output';
export class CloudApp extends CoreApp {
  request = async () => {
    try {
      await this.initializeLayers();
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

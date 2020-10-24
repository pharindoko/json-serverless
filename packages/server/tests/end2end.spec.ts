// e2e-run-tests.js
import { AppConfig } from '../src/app';
import { initServerComponents } from './handler.spec';

describe('end2end test with cypress', () => {
  const appConfig = new AppConfig();
  appConfig.jsonFile = './tests/resources/validate.handler.json';

  const localServer = initServerComponents(appConfig);
  beforeAll(async done => {
    await localServer.init();
    done();
  });

  test('all pages should be available', async done => {
    const cypress = require('cypress');
    await cypress.run({
      reporter: 'junit',
      browser: 'chrome',
      config: {
        baseUrl: 'http://localhost:3000',
        video: false,
      },
    });
    done();
  }, 60000);
});

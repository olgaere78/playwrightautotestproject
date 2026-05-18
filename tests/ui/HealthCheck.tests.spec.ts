import { test } from '../../src/fixtures/app-fixture';
import { env } from '../../src/config/env';

test('', async ({ app }) => {
  await app.mainPage.goto();
  console.log('go to ' + env.baseUrl);
  app.mainPage.assertUrlIs(env.baseUrl);
});

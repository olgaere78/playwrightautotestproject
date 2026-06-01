import { test as base } from '@playwright/test';
import { App } from '../app/app';
import { env } from '../config/env';

type Fixtures = {
  app: App;
};

export const test = base.extend<Fixtures>({
  app: async ({ page, baseURL }, use) => {
    // TodoMVC stores state in localStorage; clear it so tests don't leak state.
    if (baseURL) {
      await page.goto(env.todoMvcPath);
      await page.evaluate('localStorage.clear()');
      await page.reload();
    }
    const app = new App(page);
    await use(app);
  },
});

export { expect } from '@playwright/test';

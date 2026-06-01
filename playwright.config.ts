import { defineConfig } from '@playwright/test';
import { env } from './src/config/env';

const baseURL = env.baseURL;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'ui-chromium',
      testMatch: 'ui/**/*.spec.ts',

      use: {
        browserName: 'chromium',
      },
    },
  ],
});

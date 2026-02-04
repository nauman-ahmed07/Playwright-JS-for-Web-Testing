// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
  *@see https://playwright.dev/docs/test-configuration
 */
const Config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect: { timeout: 50*1000},
  reporter: 'html',
  use: {
   
    browserName: 'chromium',
    headless : true

  },

});

module.exports = Config
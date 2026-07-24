/// <reference types="node" />

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 30 * 1000, // 30 seconds
  testDir: "./tests",
  fullyParallel: true,
  workers: 1,
  retries: 1,
  reporter: [["list"], ["html"], ["allure-playwright"]],
  //reporter: [['dot']],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
    viewport: { width: 1920, height: 1080 }, // Set default viewport size for consistency
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
    permissions: ["geolocation"], // Set necessary permissions for geolocation-based tests },
  },

  // grep: /@master/,

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
      // use: {
      //   browserName: "chromium",
      //   viewport: null,
      //   launchOptions: { args: ["--start-maximized"] },
      // },
    },

    /* {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      },
    }, */
  ],
});


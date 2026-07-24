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
    viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency
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

/* Final Conclusion (Interview Answer)
Workers not specified → Playwright CPU ke hisaab se workers create karta hai.
4 workers create hue → Isliye spec files parallel me execute hui.
fullyParallel: false → Sirf same spec file ke tests serial me chalenge.
Different spec files phir bhi parallel me chalti hain.

Isliye tumhare current execution me tests parallel hi chale hain. */

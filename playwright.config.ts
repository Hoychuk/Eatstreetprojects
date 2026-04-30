import { PlaywrightTestConfig, devices } from "@playwright/test";

const commonConfig = {
  use: {
    ...devices["Desktop Chrome"],
    channel: "chrome",
  },
};

const projects = [
  {
    name: "chrome 1366 768",
    use: {
      ...commonConfig.use,
      viewport: { width: 1366, height: 768 },
    },
    workers: 1,
    retries: 0,
    retryIntervals: [1000, 2000],
    slowMo: 0,
  },
];

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

const config: PlaywrightTestConfig = {
  projects,
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: { mode: "retain-on-failure", size: { width: 640, height: 360 } },
  },
  timeout: 90000,
};


export default config;

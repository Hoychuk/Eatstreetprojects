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

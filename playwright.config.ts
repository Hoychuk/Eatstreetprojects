import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const isHeadless = process.env.PLAYWRIGHT_HEADLESS === "true";

export default defineConfig({
  timeout: isCI ? 180000 : 90000,
  expect: {
    timeout: isCI ? 15000 : 5000,
  },
  workers: 1,
  retries: 0,
  use: {
    headless: isHeadless,
    screenshot: "only-on-failure",
    video: { mode: "retain-on-failure", size: { width: 640, height: 360 } },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
});

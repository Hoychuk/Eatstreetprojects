import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 90000,
  workers: 1,
  retries: 0,
  use: {
    headless: false,
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

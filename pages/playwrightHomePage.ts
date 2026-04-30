import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class PlaywrightHomePage extends BasePage {
  readonly getStartedLink = this.page.getByRole('link', { name: 'Get started' });
  readonly installationHeading = this.page.getByRole('heading', { name: 'Installation' });

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async expectInstallationHeadingVisible() {
    await expect(this.installationHeading).toBeVisible();
  }
}

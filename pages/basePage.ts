import { expect, type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  getByRole(role: string, options?: Parameters<Page['getByRole']>[1]): Locator {
    return this.page.getByRole(role as any, options);
  }

  async waitForTitle(expected: string | RegExp) {
    await expect(this.page).toHaveTitle(expected);
  }
}

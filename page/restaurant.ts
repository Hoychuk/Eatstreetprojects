import { Page, Locator, expect } from '@playwright/test';

export class RestaurantPage {
  readonly page: Page;
  readonly restaurantTitle: Locator;
  readonly vegetableSamosa: Locator;
  readonly gotItButton: Locator;
  readonly checkoutButton: Locator;
  readonly userflow: Locator;
  constructor(page: Page) {
    this.page = page;

    this.restaurantTitle = page.locator('h1');
    this.vegetableSamosa = page.getByText(/Vegetable Samosa/i).first();
    this.gotItButton = page.getByRole('button', { name: /Got it/i });
    this.checkoutButton = page.getByRole('button', { name: /Proceed to Checkout/i });
    this.userflow=page.locator('.user-flow')
  }

  async open() {
    await this.page.goto(
      'https://eatstreet.com/madison-wi/restaurants/amber-indian-cuisine'
    );

    await this.restaurantTitle.waitFor();
    await this.closeCookiesIfVisible();
  }

  async closeCookiesIfVisible() {
    if (await this.gotItButton.isVisible().catch(() => false)) {
      await this.gotItButton.click();
    }
  }

  async addVegetableSamosaToCart() {
    await this.vegetableSamosa.scrollIntoViewIfNeeded();
    await this.vegetableSamosa.click();

    await this.page
      .getByRole('button', { name: /Add to Cart/i })
      .first()
      .click();
  }

  async openCart() {
    await this.page.getByText(/Cart/i).first().click();
  }

  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await expect(this.checkoutButton).toBeEnabled();

    await this.checkoutButton.click();
  }
  
  async showUserFlow() {
     await expect(this.userflow).toBeVisible();
     
  }
}
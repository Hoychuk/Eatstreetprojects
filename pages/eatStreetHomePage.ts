import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class EatStreetHomePage extends BasePage {
  readonly addressInput: Locator;
  readonly getFedButton: Locator;
  readonly signInButton: Locator;
  readonly cartButton: Locator;
  readonly deliveryRadio: Locator;
  readonly takeoutRadio: Locator;

  constructor(page: Page) {
    super(page);
    this.addressInput = page.getByPlaceholder('Enter Your Address');
    this.getFedButton = page.getByRole('button', { name: 'Get Fed' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.cartButton = page.getByRole('button', { name: 'Cart' });
    this.deliveryRadio = page.getByRole('radio', { name: 'Delivery' });
    this.takeoutRadio = page.getByRole('radio', { name: 'Takeout' });
  }

  async goto() {
    await super.goto('https://eatstreet.com/');
  }

  async enterAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async clickGetFed() {
    await this.getFedButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickCart() {
    await this.cartButton.click();
  }

  async selectDelivery() {
    await this.deliveryRadio.check();
  }

  async selectTakeout() {
    await this.takeoutRadio.check();
  }

  async expectHomeTitle() {
    await expect(this.page).toHaveTitle(/EatStreet/i);
  }
}

import { test, expect } from '@playwright/test';
import { RestaurantPage } from '../page/restaurant';

test('C156 G7-UI-01: Checkout Entry Starts From Cart', async ({ page }) => {
  const restaurantPage = new RestaurantPage(page);

  await restaurantPage.open();
    await restaurantPage.closeCookiesIfVisible();

  await restaurantPage.addVegetableSamosaToCart();

  await restaurantPage.openCart();

  await restaurantPage.proceedToCheckout();

  await restaurantPage.showUserFlow();
  await page.waitForTimeout(2200);
});
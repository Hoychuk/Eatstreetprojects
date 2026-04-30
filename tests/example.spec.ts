import { test, expect } from '@playwright/test';
import { EatStreetHomePage } from '../pages/eatStreetHomePage';

test('eatstreet home page loads', async ({ page }) => {
  const home = new EatStreetHomePage(page);
  await home.goto();
  await home.expectHomeTitle();
});

test('enter address and show restaurant search', async ({ page }) => {
  const home = new EatStreetHomePage(page);
  await home.goto();
  await home.selectDelivery();
  await home.enterAddress('90210');
  await home.clickGetFed();
  await expect(page).toHaveURL(/eatstreet\.com/);
});

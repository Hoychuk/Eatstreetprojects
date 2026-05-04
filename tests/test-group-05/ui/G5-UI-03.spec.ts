import { test, expect } from '@playwright/test';

test.describe("G5-UI-03, @C148", () => {
  test('test', async ({ page }) => {
    await page.goto('https://eatstreet.com/');
    await page.getByRole('button', { name: 'Got it' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Address' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Address' }).fill('Amber Indian Cuisine');
    await page.getByText('Amber Indian Cuisine,').click();
    await page.locator('.is-clickable.product-container').first().click();
    await page.getByRole('button', { name: 'Add to Cart − $' }).click();

    await expect(page.locator('.navbar__cart-count')).toHaveText('1');

    await expect(page.getByRole('cell', { name: /Vegetable Samosa/ }))
    .toContainText('Vegetable Samosa (2 Pieces)');

  });
});
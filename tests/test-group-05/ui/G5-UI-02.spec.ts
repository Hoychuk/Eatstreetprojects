import { test, expect } from '@playwright/test';

test.describe("G5-UI-02, @C147", () => {
  test('Item Options Controls', async ({ page }) => {
    await page.goto('https://eatstreet.com/');
    await page.getByRole('button', { name: 'Got it' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Address' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Address' }).fill('Amber Indian Cuisine');
    await page.getByText('Amber Indian Cuisine,').click();
    await page.locator('.is-clickable.product-container').first().click();
    await expect(page.getByRole('button', { name: 'Back to Menu' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart − $' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe("G5-UI-01, @C145", () => {
  test('test', async ({ page }) => {
    await page.goto('https://eatstreet.com/');
    await page.getByRole('button', { name: 'Got it' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Address' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Address' }).fill('Amber Indian Cuisine');
    await page.getByText('Amber Indian Cuisine,').click();
    await page.locator('.is-clickable.product-container').first().click();

    expect(page).toHaveURL("https://eatstreet.com/madison-wi/restaurants/amber-indian-cuisine/options/12772049");
  });
});
import { expect, test } from '@playwright/test';
import { API } from '../../../api/api';

test.describe('G5-API-01 @C146', () => {
  test('Product Options', async ({ request }) => {
    const api = new API(request);
    const response = await api.getProductOptions();
    expect(response.status()).toBe(200);
    console.log((await response.body()).toString());
  });
});
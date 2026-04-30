import { expect, test } from '@playwright/test';
import { API } from '../../../api/api';

test.describe('G2-API-01 @C126', () => {
  test('Warm Address Search Cache', async ({ request }) => {
    const api = new API(request);
    const response = await api.getWarmAdressSearchCache();
    expect(response.status()).toBe(200);
    console.log((await response.body()).toString());
  });
});


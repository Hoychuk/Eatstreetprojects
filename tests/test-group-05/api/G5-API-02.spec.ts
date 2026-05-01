import { expect, test } from '@playwright/test';
import { API } from '../../../api/api';

test.describe('G5-API-02 @C144', () => {


  test('Product Details - Name and Price Validation', async ({ request }) => {
    const api = new API(request);
    const response = await api.getProductDetails();
    
    // Validate response status
    expect(response.status()).toBe(200);
    
    // Parse response body
    const responseBody = await response.json();
    console.log(responseBody);
    
    // Validate product name (adjust property names based on actual API response)
    expect(responseBody).toHaveProperty('name');
    expect(responseBody.name).toBeTruthy();
    
    // Validate price fields (adjust property names as needed)
    expect(responseBody).toHaveProperty('price');
    expect(Number(responseBody.price)).toBeGreaterThan(0);
  });
});
import { expect, test } from '@playwright/test';
import { API } from '../../../api/api';

class TestEntry{
  id: string;
  valid: boolean;
  address: string;
}

const testData: TestEntry[] = [
  { id: 'ChIJw3kB0U4pB4gR1D2T5fNf9P8', valid: true, address: 'Madison, WI' },
  { id: 'ChIJOwg_06VPwokRYv534QaPC8g', valid: true, address: 'New York, NY' },
  { id: 'ChIJdX85S7RqkFQRE9EwXW31xhE', valid: true, address: 'Seattle, WA 98101' },
  { id: 'ChIJIQBpAG2ahYAR_6128GcTUEo', valid: true, address: 'San Francisco, CA' },
  { id: '', valid: false, address: '' },
  { id: '   ', valid: false, address: '' },
];

test.describe('G2-API-02', () => {
  test('Place ID Lookup', async ({ request }) => {
    const api = new API(request);
    for (const entry of testData) {
      if (entry.valid) await parametricPositiveTest(entry);
      else await parametricNegativeTest(entry);
    }

    async function parametricPositiveTest(entry: TestEntry) {
      console.log(entry.id);
      await test.step('Send request for Ppositive Scenario', async () => {
        const response = await api.getlookupPlaceById(entry.id);
        const responseText = await response.text();
        await test.step('Check For OK Response', async () => {
          expect.soft(response.status()).toBe(200);
          console.log((response.statusText()));
          console.log((responseText).toString());
        });
      });
    }

    async function parametricNegativeTest(entry: TestEntry) {
      console.log(entry.id);
      await test.step('Send request for Negative Scenario', async () => {
        const response = await api.getlookupPlaceById(entry.id);
        const responseText = await response.text();

        await test.step('Check For Error Page', async () => {
          expect.soft(responseText).toContain('404');
          console.log(response.statusText());
          console.log(responseText);
        });
      });
    }
  });
});


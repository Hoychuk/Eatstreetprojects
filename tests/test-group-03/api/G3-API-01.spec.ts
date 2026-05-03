import { request, expect, test } from "@playwright/test";

test.describe("G3-API-01, @C132", () => {
  test("GET restaurant cards nearby returns 200", async ({ request }) => {
    const response = await request.get(
      "https://eatstreet.com/api/v2/restaurant-cards/nearby",
      {
        params: {
          address: "Madison, WI",
        },
      },
    );

    await test.step("Verify response", async () => {
        console.log(response);
        await expect(response.status()).toBe(200);
    })
  });
});

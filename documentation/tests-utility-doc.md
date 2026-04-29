# EatStreet TestRail Case Validation Draft

## Table of Contents

- [Purpose](#purpose)
- [API Payload Examples](#api-payload-examples)
- [Group Summary](#group-summary)
- [Team Groups](#team-groups)
  - [Group 1: Home Page and Initial Load](#group-1-home-page-and-initial-load)
  - [Group 2: Address Search and Order Mode](#group-2-address-search-and-order-mode)
  - [Group 3: Restaurant Listing](#group-3-restaurant-listing)
  - [Group 4: Restaurant Detail and Menu](#group-4-restaurant-detail-and-menu)
  - [Group 5: Item Options and Add to Cart](#group-5-item-options-and-add-to-cart)
  - [Group 6: Cart Management](#group-6-cart-management)
  - [Group 7: Checkout Entry and Authentication Gate](#group-7-checkout-entry-and-authentication-gate)
  - [Group 8: Invalid and Edge-Case Search](#group-8-invalid-and-edge-case-search)
  - [Group 9: Footer, Public Links, and Public API Baseline](#group-9-footer-public-links-and-public-api-baseline)

## Purpose

This temporary document is for team validation before updating TestRail. Do not sync these changes to TestRail until the team approves the grouped cases.

Source inputs:

- Local test plan: `documentation/test-plan.md`
- Site map and product analysis: `documentation/SITE_MAP.md`
- TestRail project: `EatStreet`, `projectId: 2`
- TestRail suite: `Master`, `suiteId: 6`
- TestRail section: `Test Cases`, `sectionId: 42`
- Current TestRail cases: 29
- Target team split: 9 groups, each with 3 UI tests and 3 API/network tests

Validation rules:

- Ignore cookie banner behavior.
- Cookie banner behavior is not a pass/fail condition, but automation may need to dismiss or bypass it before clicking page controls because it can intercept pointer events.
- Do not place a real order.
- Do not use real payment data.
- API/network cases must be executed as isolated API tests using direct HTTP requests only (no UI interaction).
- API/network case titles and assertions must include explicit HTTP method and route path so each case can be reproduced in any API test client.
- Test steps must use real visible UI labels or verified URLs.

## API Payload Examples

Use these request fixtures for API-only automation. Replace placeholder values with environment-specific values when needed.

Base variables:

- `{{baseUrl}} = https://eatstreet.com`
- `{{madisonLat}} = 43.0731`
- `{{madisonLng}} = -89.4012`
- `{{placeId}} = ChIJ7cv00DwsDogRAMDACa2m4K8`

Query fixture example for `GET /api/v2/restaurant-cards/nearby`:

```text
{{baseUrl}}/api/v2/restaurant-cards/nearby?lat={{madisonLat}}&lng={{madisonLng}}&delivery=true&takeout=false&page=1
```

Query fixture example for `GET /api/v2/active-promotion/coordinates`:

```text
{{baseUrl}}/api/v2/active-promotion/coordinates?lat={{madisonLat}}&lng={{madisonLng}}
```

Body fixture template for `POST /api/v2/actual-fees-for-order`:

```json
{
  "orderItems": [
    {
      "productId": 12772049,
      "quantity": 1,
      "unitPrice": 4.95
    }
  ],
  "restaurantSlug": "amber-indian-cuisine",
  "localeSlug": "madison-wi",
  "serviceType": "delivery"
}
```

Body fixture template for `POST /api/v2/ab-request-batch`:

```json
{
  "requests": [
    {
      "requestName": "homepage_experiment",
      "context": {
        "locale": "madison-wi",
        "platform": "web"
      }
    }
  ]
}
```

Body fixture template for `POST /api/v2/account-session/new`:

```json
{
  "origin": "web",
  "intent": "checkout",
  "locale": "madison-wi"
}
```

## Group Summary

Each group is intended for one team member and contains 3 UI cases plus 3 API/network cases. In TestRail, use these group names as permanent sections and create one execution test run per group after approval.


| Group   | Section / run name                               | Main focus                                                                              | Preconditions                                                                                     | UI cases | API/network cases |
| ------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------- | ----------------- |
| Group 1 | Home Page and Initial Load                       | Homepage smoke, header navigation, marketing content                                    | Public site is reachable; no account, address, restaurant, cart item, or payment data required    | 3        | 3                 |
| Group 2 | Address Search and Order Mode                    | Delivery/takeout toggle, address field, valid Madison search                            | Public site is reachable; test location is `Madison, WI`; geolocation permission is not required  | 3        | 3                 |
| Group 3 | Restaurant Listing                               | Madison results, filters, pagination                                                    | `Madison, WI` search reaches `/restaurants/search?espPageNumber=1`                                | 3        | 3                 |
| Group 4 | Restaurant Detail and Menu                       | `Amber Indian Cuisine`, tabs, menu item visibility                                      | Madison context exists; `Amber Indian Cuisine` is reachable; restaurant open state is not assumed | 3        | 3                 |
| Group 5 | Item Options and Add to Cart                     | Samosa options page, controls, add-to-cart                                              | `Amber Indian Cuisine` menu is loaded; safe item is `1. Vegetable Samosa (2 Pieces)` at `$4.95`   | 3        | 3                 |
| Group 6 | Cart Management                                  | Cart visibility, empty state, persistence                                               | Cart may start empty; cart update cases require adding `1. Vegetable Samosa (2 Pieces)` first     | 3        | 3                 |
| Group 7 | Checkout Entry and Authentication Gate           | Checkout start, sign-in gate, replacement for real order placement                      | At least one cart item exists; stop before payment or order submission                            | 3        | 3                 |
| Group 8 | Invalid and Edge-Case Search                     | Invalid input, partial input, whitespace/case handling                                  | Public site is reachable; invalid and edge-case data is non-sensitive                             | 3        | 3                 |
| Group 9 | Footer, Public Links, and Public API Baseline    | Footer sections, app links, support/legal/careers/partner links, public baseline APIs   | Public site is reachable; no account or order state required                                      | 3        | 3                 |


Common automation note for all groups:

- Cookie banner behavior is out of functional scope, but automated tests may need to dismiss or bypass it as setup if it intercepts clicks or blocks visibility.

## Team Groups

### Group 1: Home Page and Initial Load

Preconditions:

- Public EatStreet site is reachable at `https://eatstreet.com/`.
- No account, address, restaurant, cart item, or payment data is required.

Automation note:

- Cookie banner validation is out of scope, but automated execution may need to dismiss or bypass the banner before clicking header or search controls.

#### G1-UI-01: Home Page Smoke

Source: update `C56`

Steps:

1. Open `https://eatstreet.com/`.
2. Verify the browser title contains `Order Food Online Near You | EatStreet.com`.
3. Verify `EatStreet Logo`, `Enter Your Address`, `Delivery`, `Takeout`, `Use my location`, and `Get Fed` are visible.

Expected:

- Home page loads without browser connection errors.
- Main ordering controls are visible and usable.
- Cookie banner behavior is ignored.

#### G1-UI-02: Header Navigation Elements

Source: new UI case

Steps:

1. Open `https://eatstreet.com/`.
2. Verify header shows `Partner with us`.
3. Verify header shows `Sign In`.
4. Verify header shows `Cart`.

Expected:

- Header navigation is visible.
- `Sign In` and `Cart` are available from the homepage.

#### G1-UI-03: Homepage Marketing Content

Source: new UI case

Steps:

1. Open `https://eatstreet.com/`.
2. Verify `EatStreet is the Smartest Way to Order Food Online` is displayed.
3. Verify `Sign Up Your Restaurant`, `Join Our Team`, and `Download The App` are displayed.

Expected:

- Primary marketing content renders below the search area.
- The page does not show broken or empty content blocks.

#### G1-API-01: GET /api/v2/order-session-info - Order Session Info

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/order-session-info` from an API test client.
2. Validate response status and body.

Expected:

- Request returns `200`.
- Response does not expose payment data.

#### G1-API-02: GET /api/v2/user - Anonymous User

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/user` from an API test client.
2. Validate response status and anonymous user payload.

Expected:

- Request returns `200`.
- Anonymous state is returned without requiring UI-driven authentication flow.

#### G1-API-03: GET /api/v2/locale-alerts - Locale Alerts

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/locale-alerts` from an API test client.
2. Validate response status and payload shape.

Expected:

- Request returns `200`.
- Missing or empty alerts do not break the homepage.

### Group 2: Address Search and Order Mode

Preconditions:

- Public EatStreet site is reachable at `https://eatstreet.com/`.
- Test location is `Madison, WI`.
- Browser geolocation permission can remain unset because manual address entry is the primary path.

Automation note:

- If the cookie banner intercepts clicks on `Get Fed`, dismiss or bypass it before continuing.

#### G2-UI-01: Delivery and Takeout Toggle

Source: update `C62`

Steps:

1. Open `https://eatstreet.com/`.
2. Verify `Delivery` is selected by default.
3. Select `Takeout`.
4. Select `Delivery` again.

Expected:

- Selected order mode changes visually.
- Address search remains available after toggling.

#### G2-UI-02: Address Field Input

Source: update `C57`

Steps:

1. Open `https://eatstreet.com/`.
2. Click `Enter Your Address`.
3. Type `Madison, WI`.

Expected:

- Input accepts the full location text.
- Address suggestions or valid search behavior is triggered.

#### G2-UI-03: Valid Location Search

Source: update `C63`

Steps:

1. Open `https://eatstreet.com/`.
2. Type `Madison, WI` into `Enter Your Address`.
3. Click `Get Fed`.
4. Verify the URL is `/restaurants/search?espPageNumber=1`.

Expected:

- User is navigated to the restaurant search page.
- Search results are for Madison.

#### G2-API-01: GET /api/v2/warm-address-search-cache - Warm Address Search Cache

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/warm-address-search-cache` from an API test client.
2. Validate response status and response time.

Expected:

- Request returns `200`.
- Failure does not block manual address entry.

#### G2-API-02: GET /api/v2/lookup-place-id/{placeId} - Place ID Lookup

Source: new API case

Steps:

1. Set a known `placeId` variable and send `GET {{baseUrl}}/api/v2/lookup-place-id/{{placeId}}` from an API test client.
2. Validate response status and place payload.

Expected:

- Lookup request returns `200`.
- Place lookup payload is returned for downstream address resolution.

#### G2-API-03: GET /api/v2/address/geocode - Address Geocode

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/address/geocode?address=Madison,+WI` from an API test client.
2. Validate response status and geocode payload.

Expected:

- Request returns `200`.
- Geocode response includes valid location coordinates.

### Group 3: Restaurant Listing

Preconditions:

- Search starts from a public browser session.
- `Madison, WI` can be submitted through `Enter Your Address`.
- Expected destination is `/restaurants/search?espPageNumber=1`.

Automation note:

- If the cookie banner or chat widget overlaps listing controls, dismiss or avoid the overlay before interacting with filters or pagination.

#### G3-UI-01: Restaurant Results Load

Source: update `C71`

Steps:

1. Search for `Madison, WI`.
2. Verify heading `Madison Restaurants That Deliver & Takeout`.
3. Verify result count text is displayed.

Expected:

- Results page loads.
- Restaurant count is displayed.

#### G3-UI-02: Listing Filters

Source: new UI case

Steps:

1. Search for `Madison, WI`.
2. Verify filters `Open Now`, `Free Delivery`, `Rating 4+`, `Order Ahead`, and `Specials`.
3. Select one visible filter.

Expected:

- Filter controls are visible.
- Selected filter changes state or updates results without a broken page.

#### G3-UI-03: Listing Pagination

Source: new UI case

Steps:

1. Search for `Madison, WI`.
2. Scroll to the bottom of results.
3. Verify pagination controls `Prev` and `Next`.

Expected:

- Pagination controls are visible.
- No overlapping or broken layout appears near pagination.

#### G3-API-01: GET /api/v2/restaurant-cards/nearby - Restaurant Cards Nearby

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/restaurant-cards/nearby` using the query fixture from `API Payload Examples`.
2. Validate response status and restaurant card list payload.

Expected:

- Request returns `200`.
- Restaurant card data is present and parseable for automation assertions.

#### G3-API-02: GET /api/v2/active-promotion/coordinates - Active Promotion by Coordinates

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/active-promotion/coordinates` using the query fixture from `API Payload Examples`.
2. Validate response status and payload structure.

Expected:

- Request returns `200`.
- Promotion response is returned without endpoint failure.

#### G3-API-03: GET /api/v2/marketing/restaurant-list-banner/active/universal - Restaurant List Banner

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/marketing/restaurant-list-banner/active/universal` from an API test client.
2. Validate response status and payload type.

Expected:

- Request returns `200`.
- Missing banner content does not break results.

### Group 4: Restaurant Detail and Menu

Preconditions:

- Test location context is Madison, WI.
- `Amber Indian Cuisine` is reachable at `/madison-wi/restaurants/amber-indian-cuisine`.
- Restaurant availability can vary; verify visible menu behavior without assuming the restaurant is open.

Automation note:

- Cookie banner behavior is not validated, but it may need to be dismissed before tab or menu item clicks.

#### G4-UI-01: Restaurant Detail Header

Source: new UI case

Steps:

1. Open `https://eatstreet.com/madison-wi/restaurants/amber-indian-cuisine`.
2. Verify `Amber Indian Cuisine` is displayed.
3. Verify address `6913 University Ave Middleton WI, 53562` is displayed.

Expected:

- Restaurant detail page loads.
- Name and location details are visible.

#### G4-UI-02: Menu, Reviews, and Hours Tabs

Source: new UI case

Steps:

1. Open the `Amber Indian Cuisine` page.
2. Verify `Menu`, `Reviews`, and `Hours` tabs are visible.
3. Open `Reviews`.
4. Open `Hours`.

Expected:

- Tabs are visible and usable.
- Reviews tab shows review content or `No reviews yet`.

#### G4-UI-03: Menu Item Visibility

Source: new UI case

Steps:

1. Open the `Amber Indian Cuisine` page.
2. Verify `Popular Items` is visible.
3. Verify `1. Vegetable Samosa (2 Pieces)` is visible with price `$4.95`.

Expected:

- Menu items and prices are visible.
- Item names match the menu data.

#### G4-API-01: GET /api/v2/restaurants/amber-indian-cuisine - Restaurant Details

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/restaurants/amber-indian-cuisine` with required query params from an API test client.
2. Validate response status and restaurant payload.

Expected:

- Request returns `200`.
- Restaurant detail payload is returned with expected restaurant identity fields.

#### G4-API-02: GET /api/v2/locales/madison-wi - Locale Data

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/locales/madison-wi` from an API test client.
2. Validate response status and locale payload.

Expected:

- Request returns `200`.
- Locale-specific page data loads.

#### G4-API-03: GET /api/v2/restaurants/amber-indian-cuisine/menu - Restaurant Menu

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/restaurants/amber-indian-cuisine/menu?isWhiteLabelContext=false` from an API test client.
2. Validate response status and menu payload.

Expected:

- Request returns `200`.
- Menu categories and items are returned in the response body.

### Group 5: Item Options and Add to Cart

Preconditions:

- `Amber Indian Cuisine` menu is loaded.
- Safe test item is `1. Vegetable Samosa (2 Pieces)`.
- Expected item price is `$4.95`.

Automation note:

- Cookie banner or other overlays must not block the item click or `Add to Cart - $4.95` button during automated execution.

#### G5-UI-01: Open Item Options

Source: update `C47`

Steps:

1. Open `Amber Indian Cuisine`.
2. Click `1. Vegetable Samosa (2 Pieces)`.
3. Verify the item options URL includes `/options/12772049`.

Expected:

- Item options page opens.
- Item title is displayed.

#### G5-UI-02: Item Options Controls

Source: new UI case

Steps:

1. Open `1. Vegetable Samosa (2 Pieces)` options.
2. Verify `Back to Menu` is visible.
3. Verify `Cancel` is visible.
4. Verify `Add to Cart - $4.95` is visible.

Expected:

- Navigation controls and add-to-cart control are available.
- Price matches the menu price.

#### G5-UI-03: Add Single Item to Cart

Source: update `C47`

Steps:

1. Open `1. Vegetable Samosa (2 Pieces)` options.
2. Click `Add to Cart - $4.95`.
3. Verify header cart count changes to `Cart 1`.
4. Verify the cart/order panel shows the selected item.

Expected:

- Item is added to cart.
- Cart count and order panel update.

#### G5-API-01: GET /api/v2/products/12772049/options - Product Options

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/products/12772049/options` from an API test client.
2. Validate response status and option groups payload.

Expected:

- Request returns `200`.
- Product option data is present for automation validation.

#### G5-API-02: GET /api/v2/products/12772049 - Product Details

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/products/12772049` from an API test client.
2. Validate response status, product name, and price fields.

Expected:

- Request returns `200`.
- Product name and price match the UI.

#### G5-API-03: POST /api/v2/actual-fees-for-order - Add-to-Cart Fee Calculation

Source: new API case

Steps:

1. Send `POST {{baseUrl}}/api/v2/actual-fees-for-order` using the body fixture from `API Payload Examples`.
2. Validate response status and fee calculation fields.

Expected:

- Request returns `200`.
- Fee calculation does not block cart update.

### Group 6: Cart Management

Preconditions:

- `Amber Indian Cuisine` is loaded.
- Cart may start empty.
- For cart update/persistence cases, add `1. Vegetable Samosa (2 Pieces)` before validation.

Automation note:

- If the cookie banner intercepts the `Cart` button or cart controls, dismiss or bypass it as setup only.

#### G6-UI-01: Cart Interface Visibility

Source: update `C46`

Steps:

1. Open `https://eatstreet.com/`.
2. Click `Cart`.
3. Observe the cart interface.

Expected:

- Cart interface opens.
- Empty cart state is shown when no items are added.

#### G6-UI-02: Empty Cart State

Source: update `C51`

Steps:

1. Open `Amber Indian Cuisine`.
2. Verify the right-side `Your Order` panel.
3. Verify empty state text `Famished? Fill me up!`.

Expected:

- Empty cart state is clear.
- Checkout amount is `$0.00` before items are added.

#### G6-UI-03: Cart Persistence During Navigation

Source: update `C83`

Steps:

1. Add `1. Vegetable Samosa (2 Pieces)` to cart.
2. Navigate back to the restaurant menu.
3. Navigate to the homepage.
4. Return to the restaurant page.
5. Open cart.

Expected:

- Cart count and selected item persist during normal navigation.

#### G6-API-01: GET /api/v2/order-session-info - Session After Cart Update

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/order-session-info` from an API test client.
2. Validate response status and session payload consistency.

Expected:

- `GET /api/v2/order-session-info` returns `200`.
- Session payload remains structurally valid for API automation.

#### G6-API-02: POST /api/v2/actual-fees-for-order - Order Summary Totals

Source: update `C52`

Steps:

1. Send `POST {{baseUrl}}/api/v2/actual-fees-for-order` using the body fixture from `API Payload Examples` with one samosa line item priced at `$4.95`.
2. Validate response status and totals fields.

Expected:

- `POST /api/v2/actual-fees-for-order` returns `200`.
- Item subtotal matches `$4.95` before taxes or fees.
- Any fees appear as separate line items, not as part of item subtotal.

#### G6-API-03: POST /api/v2/ab-request-batch - Non-Critical Request Error Handling

Source: new API case

Steps:

1. Send `POST {{baseUrl}}/api/v2/ab-request-batch` using the body fixture from `API Payload Examples`.
2. Repeat with intentionally degraded payload input to validate controlled failure handling.

Expected:

- Failed or delayed `POST /api/v2/ab-request-batch` requests do not leave stale totals visible.
- Endpoint returns controlled API behavior (success or non-5xx validation error), without unhandled server failure.

### Group 7: Checkout Entry and Authentication Gate

Preconditions:

- A cart item has been added through the public menu flow.
- Tester is not required to be signed in.
- Testing must stop at checkout entry, sign-in, or authentication gate.
- Real payment and real order submission are prohibited.

Automation note:

- Cookie banner dismissal may be required before `Proceed to Checkout`; this is setup, not an assertion.

#### G7-UI-01: Checkout Entry Starts From Cart

Source: update `C54`

Steps:

1. Add `1. Vegetable Samosa (2 Pieces)` to cart.
2. Click `Proceed to Checkout`.
3. Observe the next screen or blocking state.

Expected:

- User is not allowed to place an order without completing required checkout steps.
- If unauthenticated, user is routed to sign-in or checkout authentication gate.

#### G7-UI-02: Sign-In Element Availability

Source: update `C61`

Steps:

1. Open `https://eatstreet.com/`.
2. Click `Sign In`.
3. Verify sign-in UI or page is shown.

Expected:

- Sign-in entry point is visible.
- Required login controls or auth provider frame appears.

#### G7-UI-03: Replace Real Order Placement

Source: replace `C82`

Steps:

1. Add an item to cart.
2. Start checkout.
3. Stop at the sign-in/authentication gate or checkout entry state.

Expected:

- Test does not submit payment or place a real order.
- Cart state is preserved at the gate.

#### G7-API-01: GET /api/v2/account-session/configs - Account Session Config

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/account-session/configs` from an API test client.
2. Validate response status and auth-config payload.

Expected:

- Request returns `200`.
- Auth configuration loads without exposing sensitive data.

#### G7-API-02: POST /api/v2/account-session/new - Account Session Creation

Source: new API case

Steps:

1. Send `POST {{baseUrl}}/api/v2/account-session/new` using the body fixture from `API Payload Examples`.
2. Validate response status and session creation payload.

Expected:

- Request returns `200`.
- Session creation response is returned without unhandled errors.

#### G7-API-03: GET /api/v2/user - Checkout Redirect Safety

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/user` without authenticated credentials from an API test client.
2. Validate response status and anonymous-user payload fields.

Expected:

- `GET /api/v2/user` returns `200` with anonymous user state.
- No sensitive private data is present in the response payload.

### Group 8: Invalid and Edge-Case Search

Preconditions:

- Public EatStreet site is reachable at `https://eatstreet.com/`.
- Invalid and edge-case search data must be non-sensitive.
- Testers should not assume exact copy for validation messages until verified during execution.

Automation note:

- If the cookie banner blocks `Get Fed`, dismiss or bypass it before executing invalid-input checks.

#### G8-UI-01: Invalid Address Input

Source: update `C74`

Steps:

1. Open `https://eatstreet.com/`.
2. Enter `asdfghjkl 12345` into `Enter Your Address`.
3. Click `Get Fed`.

Expected:

- User is not taken to a broken results page.
- UI shows validation, no-results behavior, or a clear recovery path.

#### G8-UI-02: Partial City Input

Source: update `C76`

Steps:

1. Open `https://eatstreet.com/`.
2. Enter `Mad` into `Enter Your Address`.
3. Observe suggestions or validation.

Expected:

- Partial input is handled gracefully.
- User can choose a valid Madison suggestion if suggestions are shown.

#### G8-UI-03: Whitespace and Case Handling

Source: update `C72`, `C77`

Steps:

1. Search for `madison, wi`.
2. Search for `MADISON, WI`.
3. Search for   `Madison, WI`  .

Expected:

- Valid location is accepted regardless of case.
- Leading or trailing whitespace does not break search.

#### G8-API-01: GET /api/v2/address/geocode - Invalid Address Handling

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/address/geocode?address=asdfghjkl+12345` from an API test client.
2. Validate response status and controlled invalid-location payload behavior.

Expected:

- `GET /api/v2/address/geocode` does not return `5xx`.
- Response returns a controlled no-match or validation outcome.

#### G8-API-02: GET /api/v2/restaurant-cards/nearby - Empty Search Guard

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/restaurant-cards/nearby` with missing/empty required query parameters (example: omit `lat` and `lng` from the query fixture in `API Payload Examples`).
2. Validate response status and error payload.

Expected:

- Endpoint returns controlled validation behavior and does not return `5xx` for empty inputs.

#### G8-API-03: GET /api/v2/restaurant-cards/nearby - No-Results Location Handling

Source: update `C73`

Steps:

1. Send `GET {{baseUrl}}/api/v2/restaurant-cards/nearby` using the query fixture from `API Payload Examples`, replacing coordinates with a low/no-coverage area.
2. Validate response status and empty/no-results payload handling.

Expected:

- `GET /api/v2/restaurant-cards/nearby` response is handled without raw errors.
- Response provides a controlled no-results structure (empty list or equivalent).

### Group 9: Footer, Public Links, and Public API Baseline

Preconditions:

- Public EatStreet site is reachable at `https://eatstreet.com/`.
- Footer and support/app links are tested as public navigation only.
- No account or order state is required.

Automation note:

- Cookie banner may cover footer content or intercept link clicks; dismiss or bypass it before footer assertions if it blocks visibility or clicks.

#### G9-UI-01: Footer Link Sections

Source: new UI case

Steps:

1. Open `https://eatstreet.com/`.
2. Scroll to footer.
3. Verify sections `EatStreet`, `Support`, `Legal`, and `Get the App`.

Expected:

- Footer sections are visible.
- Footer layout is readable.

#### G9-UI-02: App Store Links

Source: update `C60`

Steps:

1. Open `https://eatstreet.com/`.
2. Scroll to `Get the App`.
3. Verify `Get app in Google Play`.
4. Verify `Get app in App Store`.

Expected:

- Google Play link points to `https://play.google.com/store/apps/details?id=com.eatstreet.android&hl=en`.
- App Store link points to `https://itunes.apple.com/us/app/eatstreet-food-delivery-take-out-app/id664697933?mt=8`.

#### G9-UI-03: Support, Legal, Careers, and Partner Links

Source: new UI case

Steps:

1. Open `https://eatstreet.com/`.
2. Scroll to footer and main marketing link sections.
3. Verify `About Us`, `Contact Us`, `Careers`, `For Customers`, `Privacy Policy`, `Terms of Use`, and `Get EatStreet` are visible when available.
4. Open selected links and verify they navigate to expected public destinations.

Expected:

- Public informational links open expected internal or external destinations.
- Current EatStreet page flow is not corrupted after returning.

#### G9-API-01: GET /api/v2/cities-by-state - Homepage Public Data

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/cities-by-state` from an API test client.
2. Validate response status and list payload structure.

Expected:

- `GET /api/v2/cities-by-state` returns `200`.
- State/city data is returned in a format suitable for automation assertions.

#### G9-API-02: POST /api/v2/ab-request-batch - Experiment Batch Request

Source: new API case

Steps:

1. Send `POST {{baseUrl}}/api/v2/ab-request-batch` with a valid experiment batch payload from an API test client.
2. Validate response status and response payload.

Expected:

- `POST /api/v2/ab-request-batch` returns `200` or a controlled non-5xx validation response.
- Response remains stable and parseable for API automation.

#### G9-API-03: GET /api/v2/locale-alerts - Public Link Navigation Safety

Source: new API case

Steps:

1. Send `GET {{baseUrl}}/api/v2/locale-alerts` from an API test client.
2. Validate response status and locale-alert payload.

Expected:

- `GET /api/v2/locale-alerts` returns `200`.
- Locale-alert payload is returned in a stable, automatable format.


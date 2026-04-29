# EatStreet TestRail Case Validation Draft

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
- API/network cases must be validated only through requests triggered by normal website usage.
- Test steps must use real visible UI labels or verified URLs.

## Site Map Alignment and Preconditions

`documentation/SITE_MAP.md` corresponds to the EatStreet project scope for black-box, user-facing testing. It supports the current grouping around location-based discovery, restaurant listing, restaurant detail, menu browsing, item configuration, cart behavior, checkout entry, authentication gate, support/footer links, city pages, partner links, careers, and app links.

Site map areas that must stay caveated or out of scope unless explicitly approved:

- Account profile, saved addresses, saved payment methods, order history, re-order, and post-order issue flows require a safe authenticated account.
- Real payment form submission, `Place Order`, order confirmation, and delivery fulfillment are out of scope for this study pass.
- Restaurant Dashboard and internal merchant tools are not publicly testable from the customer web flow.
- Group order, tip selector, coupon, and schedule-order behavior should be tested only if the UI appears safely before payment/order submission.

Use these preconditions when converting draft cases into TestRail case preconditions:

- If the cookie banner is displayed and blocks interaction, dismiss it before executing the case. Cookie banner behavior is out of scope and should not affect pass/fail unless it prevents core site usage after dismissal.
- Home and footer cases require only public site availability.
- Address/search cases require a public browser session and test location `Madison, WI`.
- Restaurant listing cases require successful navigation from `Madison, WI` to `/restaurants/search?espPageNumber=1`.
- Restaurant/menu/item cases require `Amber Indian Cuisine` to be reachable at `/madison-wi/restaurants/amber-indian-cuisine`.
- Cart cases require a safe menu item, currently `1. Vegetable Samosa (2 Pieces)` at `$4.95`.
- Checkout-gate cases require at least one cart item and must stop before payment or real order submission.
- API/network cases require DevTools or Playwright network monitoring and must use requests triggered by normal UI actions.

## Playwright Evidence

Verified live homepage elements:

- `EatStreet Logo`
- `Partner with us`
- `Sign In`
- `Cart`
- `Delivery`
- `Takeout`
- `Enter Your Address`
- `Use my location`
- `Get Fed`
- `Get The App`
- footer sections `EatStreet`, `Support`, `Legal`, `Get the App`
- footer links `Get app in Google Play` and `Get app in App Store`

Verified live flows:

- `Madison, WI` search navigates to `/restaurants/search?espPageNumber=1`.
- Search results show `Madison Restaurants That Deliver & Takeout`.
- Search results show filters `Open Now`, `Free Delivery`, `Rating 4+`, `Order Ahead`, `Specials`.
- Search results show `317 matching restaurants near you`.
- `Amber Indian Cuisine` page loads at `/madison-wi/restaurants/amber-indian-cuisine`.
- Restaurant page shows `Menu`, `Reviews`, `Hours`, `Your Order`, and `Proceed to Checkout $0.00`.
- Product page loads for `1. Vegetable Samosa (2 Pieces)` at `/options/12772049`.
- Product page shows `Back to Menu`, `Cancel`, and `Add to Cart - $4.95`.
- Adding `1. Vegetable Samosa (2 Pieces)` updates header cart count to `Cart 1`.

Verified API/network calls:

- `GET /api/v2/order-session-info` returned `200`.
- `GET /api/v2/user` returned `200`.
- `GET /api/v2/locale-alerts` returned `200`.
- `GET /api/v2/cities-by-state` returned `200`.
- `GET /api/v2/warm-address-search-cache` returned `200`.
- `POST /api/v2/ab-request-batch` returned `200`.
- `POST /api/v2/actual-fees-for-order` returned `200`.
- `GET /api/v2/lookup-place-id/{placeId}` returned `200`.
- `GET /api/v2/address/geocode?address=Madison,+WI` returned `200`.
- `GET /api/v2/restaurant-cards/nearby?...` returned `200`.
- `GET /api/v2/active-promotion/coordinates?...` returned `200`.
- `GET /api/v2/reordering/candidates/5` returned `200`.
- `GET /api/v2/marketing/restaurant-list-banner/active/universal` returned `200`.
- `GET /api/v2/promotions/active/locale/1` returned `200`.
- `GET /api/v2/marketing/restaurant-list-banner/active/locale/1` returned `200`.
- `GET /api/v2/restaurants/amber-indian-cuisine?...` returned `200`.
- `GET /api/v2/locales/madison-wi` returned `200`.
- `GET /api/v2/promotions/active/restaurant/43071` returned `200`.
- `GET /api/v2/restaurants/nearby?...` returned `200`.
- `GET /api/v2/restaurants/amber-indian-cuisine/menu?isWhiteLabelContext=false` returned `200`.
- `GET /api/v2/products/12772049/options` returned `200`.
- `GET /api/v2/products/12772049` returned `200`.
- TikTok analytics requests failed with `net::ERR_ABORTED`; monitor only unless user-facing behavior is affected.

## Current TestRail Case Review


| Case  | Current title                                   | Proposed action                                                                            |
| ----- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `C56` | Home Page Accessibility                         | Rewrite as homepage smoke/accessibility case without cookie banner validation.             |
| `C54` | Delivery Address Selection                      | Rewrite; current steps assume guest checkout and contain `Adress Info`.                    |
| `C46` | Cart Interface Visibility                       | Keep with clarified expected empty cart state and real `Cart` label.                       |
| `C47` | Add Single Item to Cart                         | Rewrite; current expected result has typo `clockable` and should use verified samosa data. |
| `C48` | Add Multiple Items from Same Restaurant         | Keep after confirming second item data during team execution.                              |
| `C50` | Remove Item from Cart                           | Keep after confirming remove/decrement controls during team execution.                     |
| `C51` | Empty Cart State                                | Keep with clarified `Famished? Fill me up!` empty state.                                   |
| `C52` | Order Summary Calculation Accuracy              | Rewrite; current subtotal/fee wording is incorrect.                                        |
| `C53` | Cart Order Ahead Action                         | Lower priority unless a closed order-ahead restaurant is verified.                         |
| `C57` | Search Field Presence and Input                 | Keep with `Enter Your Address` and `Madison, WI`.                                          |
| `C58` | Restaurant Sign Up Partnership Link Redirection | Rewrite using verified `Partner with us`, `Sign Up Your Restaurant`, and `Learn More`.     |
| `C59` | Join Link Redirection (Jobs)                    | Rewrite using verified `Join Our Team` and `Apply Now`; no `Join` link exists.             |
| `C60` | Mobile App Link Redirection                     | Keep with verified `Get The App`, Google Play, and App Store links.                        |
| `C61` | Sign-In Element Availability                    | Keep with verified `Sign In` header element.                                               |
| `C62` | Delivery and Takeout Toggle Behavior            | Keep.                                                                                      |
| `C63` | Search Execution with Valid Input               | Keep with verified navigation and network calls.                                           |
| `C64` | Search Execution with Invalid Input             | Keep, but validate exact message during execution.                                         |
| `C65` | Valid Phone Number with Formatting Characters   | Lower priority; depends on app landing page SMS UI.                                        |
| `C70` | Invalid Numeric Sequence Validation             | Lower priority; depends on app landing page SMS UI.                                        |
| `C71` | Filter by Valid City Name                       | Keep if city/neighborhood filter exists during execution.                                  |
| `C72` | City Filtering Case Sensitivity                 | Keep.                                                                                      |
| `C73` | Search for City with No Results                 | Keep, but choose stable no-results location during execution.                              |
| `C74` | Invalid Location Input Handling                 | Keep.                                                                                      |
| `C76` | Partial City Name Matching                      | Keep.                                                                                      |
| `C77` | Location Search with Whitespace Handling        | Keep.                                                                                      |
| `C80` | Modify Item Quantity in Cart                    | Keep after validating cart controls.                                                       |
| `C81` | Minimum Order Value Validation                  | Lower priority unless a restaurant with visible minimum order is verified.                 |
| `C82` | Final Order Placement Success                   | Replace; real order placement is out of scope.                                             |
| `C83` | Cart Persistence During Navigation              | Keep.                                                                                      |


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
| Group 9 | Footer, Public Links, and Third-Party Monitoring | Footer sections, app links, support/legal/careers/partner links, third-party monitoring | Public site is reachable; no account or order state required                                      | 3        | 3                 |


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

#### G1-API-01: Order Session Info Request

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Monitor network requests.
3. Find `GET /api/v2/order-session-info`.

Expected:

- Request returns `200`.
- Response does not expose payment data.

#### G1-API-02: Anonymous User Request

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Monitor network requests.
3. Find `GET /api/v2/user`.

Expected:

- Request returns `200`.
- Anonymous state is handled without blocking homepage rendering.

#### G1-API-03: Locale Alerts Request

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Monitor network requests.
3. Find `GET /api/v2/locale-alerts`.

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

#### G2-API-01: Warm Address Search Cache

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Monitor network requests.
3. Find `GET /api/v2/warm-address-search-cache`.

Expected:

- Request returns `200`.
- Failure does not block manual address entry.

#### G2-API-02: Place ID Lookup

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Type `Madison, WI`.
3. Monitor requests triggered by autocomplete.
4. Find `GET /api/v2/lookup-place-id/{placeId}`.

Expected:

- Lookup request returns `200`.
- The UI can continue to `Get Fed`.

#### G2-API-03: Address Geocode

Source: new API case

Steps:

1. Search for `Madison, WI` from the homepage.
2. Monitor network requests.
3. Find `GET /api/v2/address/geocode?address=Madison,+WI`.

Expected:

- Request returns `200`.
- Search proceeds to restaurant results.

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

#### G3-API-01: Restaurant Cards Nearby

Source: new API case

Steps:

1. Search for `Madison, WI`.
2. Monitor network requests.
3. Find `GET /api/v2/restaurant-cards/nearby?...`.

Expected:

- Request returns `200`.
- Restaurant cards render from the response.

#### G3-API-02: Active Promotion by Coordinates

Source: new API case

Steps:

1. Search for `Madison, WI`.
2. Monitor network requests.
3. Find `GET /api/v2/active-promotion/coordinates?...`.

Expected:

- Request returns `200`.
- Promotion data does not block restaurant list rendering.

#### G3-API-03: Restaurant List Banner

Source: new API case

Steps:

1. Search for `Madison, WI`.
2. Monitor network requests.
3. Find `GET /api/v2/marketing/restaurant-list-banner/active/universal`.

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

#### G4-API-01: Restaurant Details Request

Source: new API case

Steps:

1. Open the `Amber Indian Cuisine` page.
2. Monitor network requests.
3. Find `GET /api/v2/restaurants/amber-indian-cuisine?...`.

Expected:

- Request returns `200`.
- Restaurant details render successfully.

#### G4-API-02: Locale Request

Source: new API case

Steps:

1. Open the `Amber Indian Cuisine` page.
2. Monitor network requests.
3. Find `GET /api/v2/locales/madison-wi`.

Expected:

- Request returns `200`.
- Locale-specific page data loads.

#### G4-API-03: Restaurant Menu Request

Source: new API case

Steps:

1. Open the `Amber Indian Cuisine` page.
2. Monitor network requests.
3. Find `GET /api/v2/restaurants/amber-indian-cuisine/menu?isWhiteLabelContext=false`.

Expected:

- Request returns `200`.
- Menu categories and items render.

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

#### G5-API-01: Product Options Request

Source: new API case

Steps:

1. Open `1. Vegetable Samosa (2 Pieces)` options.
2. Monitor network requests.
3. Find `GET /api/v2/products/12772049/options`.

Expected:

- Request returns `200`.
- Product options page can render.

#### G5-API-02: Product Details Request

Source: new API case

Steps:

1. Open `1. Vegetable Samosa (2 Pieces)` options.
2. Monitor network requests.
3. Find `GET /api/v2/products/12772049`.

Expected:

- Request returns `200`.
- Product name and price match the UI.

#### G5-API-03: Add-to-Cart Fee Calculation

Source: new API case

Steps:

1. Add `1. Vegetable Samosa (2 Pieces)` to cart.
2. Monitor network requests.
3. Find `POST /api/v2/actual-fees-for-order`.

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

#### G6-API-01: Order Session After Cart Update

Source: new API case

Steps:

1. Add an item to cart.
2. Monitor network requests.
3. Verify session-related requests complete successfully.

Expected:

- No `5xx` response occurs.
- Cart state remains consistent in the UI.

#### G6-API-02: Order Summary Totals

Source: update `C52`

Steps:

1. Add `1. Vegetable Samosa (2 Pieces)` to cart.
2. Observe item price and subtotal.
3. Monitor network requests related to totals or fees.

Expected:

- Item subtotal matches `$4.95` before taxes or fees.
- Any fees appear as separate line items, not as part of item subtotal.

#### G6-API-03: Cart Request Error Handling

Source: new API case

Steps:

1. Add and remove an item from the cart.
2. Monitor cart and fee-related network requests.
3. Check the UI after each operation.

Expected:

- Failed or delayed non-critical requests do not leave stale totals visible.
- No raw API error is shown to the user.

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

#### G7-API-01: Account Session Config

Source: new API case

Steps:

1. Start checkout from a cart with one item.
2. Monitor network requests.
3. Find `GET /api/v2/account-session/configs` if triggered by the auth flow.

Expected:

- Request returns `200` when triggered.
- Auth configuration loads without exposing sensitive data.

#### G7-API-02: Account Session Creation

Source: new API case

Steps:

1. Start checkout from a cart with one item.
2. Monitor network requests.
3. Find `POST /api/v2/account-session/new` if triggered by the auth flow.

Expected:

- Request returns `200` when triggered.
- Redirect or auth state is handled cleanly.

#### G7-API-03: Checkout Redirect Safety

Source: new API case

Steps:

1. Start checkout as an unauthenticated user.
2. Monitor redirects and network requests.
3. Inspect the resulting URL and request payloads.

Expected:

- Redirect is expected for unauthenticated users.
- No real card data or sensitive private data is sent.

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

#### G8-API-01: Invalid Address Does Not Produce 5xx

Source: new API case

Steps:

1. Search for `asdfghjkl 12345`.
2. Monitor network requests.
3. Check address lookup/geocode responses.

Expected:

- No unhandled `5xx` responses occur.
- UI shows a controlled error or no-results state.

#### G8-API-02: Empty Search Handling

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Leave `Enter Your Address` empty.
3. Click `Get Fed`.
4. Monitor network requests.

Expected:

- UI prevents broken navigation.
- No unnecessary restaurant list API request is sent for empty input.

#### G8-API-03: No-Results Location Handling

Source: update `C73`

Steps:

1. Search for a valid location with no expected restaurant coverage.
2. Monitor network requests.
3. Observe UI state.

Expected:

- API response is handled without raw errors.
- UI shows no-results or unsupported-area messaging.

### Group 9: Footer, Public Links, and Third-Party Monitoring

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

#### G9-API-01: Third-Party Request Monitoring

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Monitor third-party requests.
3. Record Google Maps, Salesforce chat, Stripe, Forter, New Relic, TikTok, and TurnTo behavior when present.

Expected:

- Third-party failures are documented.
- Search and ordering entry remain usable.

#### G9-API-02: TikTok Analytics Failure Does Not Block UI

Source: new API case

Steps:

1. Open `https://eatstreet.com/`.
2. Monitor TikTok analytics requests.
3. Continue through address search to restaurant results.

Expected:

- TikTok failure, if reproduced, does not block home page or restaurant search.

#### G9-API-03: External Link Safety

Source: new API case

Steps:

1. Open footer links for app stores or support destinations in a new tab.
2. Verify navigation target.
3. Return to EatStreet page.

Expected:

- External links open correct destinations.
- Current EatStreet flow is not corrupted after returning.

## Proposed TestRail Changes After Approval

Update existing cases:

- `C56`, `C54`, `C46`, `C47`, `C51`, `C52`, `C57`, `C58`, `C59`, `C60`, `C61`, `C62`, `C63`, `C64`, `C71`, `C72`, `C73`, `C74`, `C76`, `C77`, `C80`, `C82`, `C83`

Lower priority or keep out of the first sync unless verified:

- `C53`, `C65`, `C70`, `C81`

Add new TestRail cases for API/network coverage:

- All draft cases marked `new API case`

Add new UI cases only where existing TestRail cases do not cover the group requirement:

- All draft cases marked `new UI case`

## Approval Checklist

- Group 1 approved
- Group 2 approved
- Group 3 approved
- Group 4 approved
- Group 5 approved
- Group 6 approved
- Group 7 approved
- Group 8 approved
- Group 9 approved
- Approved to update existing TestRail cases
- Approved to add new TestRail cases


# EatStreet Web Test Plan

## Table of Contents

1. [Purpose](#1-purpose)
2. [Scope](#2-scope)
3. [Out of Scope](#3-out-of-scope)
4. [Features to be Tested](#4-features-to-be-tested)
5. [Test Environment](#5-test-environment)
6. [Test Data](#6-test-data)
7. [Critical Test Scenarios](#7-critical-test-scenarios)
8. [Basic API and Network Checks](#8-basic-api-and-network-checks)
9. [Entry Criteria](#9-entry-criteria)
10. [Exit Criteria](#10-exit-criteria)
11. [Deliverables](#11-deliverables)

## 1. Purpose

The purpose of this test plan is to verify that the EatStreet public web application works correctly for the main customer ordering flow.

Product under test: [https://eatstreet.com/](https://eatstreet.com/)

Testing is focused only on the browser UI and basic API/network requests that are triggered by normal website usage. Backend, database, internal admin tools, real payment processing, and real delivery fulfillment are not tested directly.

## 2. Scope

This test plan covers only the public EatStreet web application.

In scope:

- Home page and public navigation.
- Cookie banner behavior.
- Address/location search.
- Delivery and Takeout selection.
- Restaurant search results.
- Restaurant list filters, categories, pagination, and load more behavior.
- Restaurant detail page.
- Menu tabs, categories, menu search, and menu items.
- Item options page.
- Add to cart flow.
- Cart count and order summary.
- Checkout entry flow up to sign-in/authentication gate.
- Sign-in/sign-up entry points.
- Basic responsive layout checks.
- Basic console and network/API checks through browser DevTools.

## 3. Out of Scope

The following areas are not covered:

- Direct backend testing.
- Database validation.
- Internal admin panel.
- Restaurant dashboard.
- Driver app.
- Mobile native apps.
- Real order placement.
- Real payment card processing.
- Real refund validation.
- Real delivery tracking and fulfillment.
- Email, SMS, and push notification delivery.
- Load, stress, and scalability testing.
- Full security penetration testing.
- Direct API testing outside requests naturally triggered by the website.

## 4. Features to be Tested

The following features should be tested:

- Home page load and main content.
- Cookie banner accept/opt-out behavior.
- Delivery/Takeout toggle.
- Address input and location search.
- `Use my location` behavior, including browser permission handling.
- `Get Fed` action.
- Restaurant listing for a valid location.
- Restaurant filters and categories.
- Restaurant sorting, pagination, and load more.
- Restaurant card click/navigation.
- Restaurant header details: name, cuisine, address, hours, ETA, delivery minimum, delivery cost.
- Menu, Reviews, and Hours tabs.
- Menu search.
- Menu categories and item prices.
- Item details/options page.
- Add to cart.
- Cart count in header.
- Right-side `Your Order` panel.
- Subtotal and checkout button amount.
- Checkout redirect to sign-in for unauthenticated users.
- Footer links and support links.
- Chat widget visibility.
- Console errors and failed network requests.

## 5. Test Environment

Testing should be performed against the public production website.

- URL: [https://eatstreet.com/](https://eatstreet.com/)
- Primary browser: Google Chrome latest version
- Tools:
  - Chrome/Edge DevTools
  - Network tab
  - Console tab

## 6. Test Data

Use non-sensitive test data only.

Recommended data:

- Location: `Madison, WI`
- Restaurant: `Amber Indian Cuisine`
- Restaurant URL: `/madison-wi/restaurants/amber-indian-cuisine`
- Test menu item: `1. Vegetable Samosa (2 Pieces)`
- Observed item price: `$4.95`
- Observed restaurant details:
  - Address: `6913 University Ave Middleton WI, 53562`
  - ETA: `15 - 30 min`
  - Delivery minimum: `None`
  - Delivery cost: `FREE Delivery`

Additional test data:

- Invalid address, for example `asdfghjkl 12345`.
- Incomplete address, for example `Mad`.
- Food keywords:
  - `pizza`
  - `burger`
  - `sushi`
  - `coffee`
- Restaurant or cuisine keywords:
  - `Indian`
  - `Pizza`
  - `Sushi`

Do not use real card data. Do not submit a real order unless explicitly approved.

## 7. Critical Test Scenarios

### 7.1 Home Page

- Open `https://eatstreet.com/`.
- Verify page title is displayed as an EatStreet ordering page.
- Verify EatStreet logo is visible.
- Verify `Sign In` and `Cart` are visible in the header.
- Verify Delivery is selected by default.
- Verify Takeout can be selected.
- Verify address input is visible with `Enter Your Address`.
- Verify `Use my location` is visible.
- Verify `Get Fed` is visible.
- Verify the cookie banner can be accepted with `Got it`.
- Verify no critical UI elements are hidden behind the cookie banner or chat widget.
- Verify no blocking JavaScript errors appear in the console.

### 7.2 Address Search

- Enter `Madison, WI` into the address input.
- Verify place lookup requests are triggered.
- Click `Get Fed`.
- Verify the user is navigated to `/restaurants/search?espPageNumber=1`.
- Verify the address field on the restaurant listing page contains `Madison WI`.
- Verify the restaurant list loads.
- Verify invalid or incomplete addresses show clear validation or no-results behavior.

### 7.3 Restaurant Listing Page

- Verify the heading `Madison Restaurants That Deliver & Takeout` is displayed.
- Verify restaurant count text is displayed.
- Verify restaurant cards are displayed.
- Verify filters are visible:
  - `Open Now`
  - `Free Delivery`
  - `Rating 4+`
  - `Order Ahead`
  - `Specials`
- Verify category filters are visible and selectable.
- Verify sorting control is visible.
- Verify pagination controls are visible.
- Verify `Load more restaurants` is visible when available.
- Verify clicking a restaurant card opens the restaurant detail page.
- Verify selected filters update the restaurant list or URL state correctly.

### 7.4 Restaurant Detail Page

- Open `Amber Indian Cuisine`.
- Verify restaurant name is displayed.
- Verify cuisine types are displayed.
- Verify restaurant address is displayed.
- Verify Hours, ETA, Delivery Minimum, and Delivery Cost are displayed.
- Verify Menu, Reviews, and Hours tabs are visible.
- Verify Menu tab is selected by default.
- Verify Reviews tab can be opened and displays review content or empty review state.
- Verify Hours tab can be opened and displays restaurant hours.
- Verify breadcrumb/navigation links are visible.

### 7.5 Menu Search and Menu Items

- Verify menu search field is visible.
- Search for a menu item, for example `samosa`.
- Verify matching menu items remain visible.
- Clear the menu search.
- Verify menu categories are displayed.
- Verify item names and prices are displayed.
- Verify duplicate item names in popular/category sections do not break item selection.
- Verify clicking `1. Vegetable Samosa (2 Pieces)` opens the item options page.

### 7.6 Item Options Page

- Verify item title is displayed.
- Verify item description is displayed.
- Verify price is displayed on the `Add to Cart` button.
- Verify `Cancel` returns user back to menu without changing cart.
- Verify `Back to Menu` returns user back to menu.
- Verify `Add to Cart - $4.95` adds item to the cart.
- Verify required modifiers, if present for another item, must be selected before add-to-cart.

### 7.7 Cart

- Add `1. Vegetable Samosa (2 Pieces)` to the cart.
- Verify header cart count changes to `Cart 1`.
- Verify right-side `Your Order` panel displays the item.
- Verify subtotal is `$4.95`.
- Verify checkout button amount changes from `$0.00` to `$4.95`.
- Verify item remove action is available.
- Verify removing item resets cart to empty state.
- Verify cart state after page refresh.
- Verify adding multiple items updates quantity and subtotal correctly.

### 7.8 Checkout Entry

- Add one item to cart.
- Click `Proceed to Checkout`.
- Verify unauthenticated user is redirected to `/signin?next=~2Fcheckout~2Forder&nextState=checkout.delivery`.
- Verify sign-up/sign-in content is displayed.
- Verify cart summary is still visible with the selected item and amount.
- Verify checkout cannot continue without authentication.
- Stop testing before real payment or real order submission.

### 7.9 Sign In and Sign Up Gate

- Click `Sign In` from header.
- Verify sign-in/sign-up UI opens or page is displayed.
- Verify required fields are present.
- Verify empty required fields show validation messages.
- Verify invalid email format is rejected.
- Verify password fields mask input.
- Verify reCAPTCHA or other anti-bot elements do not block basic UI rendering.

### 7.10 Footer, Legal, and Support Links

- Verify footer sections are visible:
  - EatStreet
  - Support
  - Legal
  - Get the App
- Verify key links open correct destinations:
  - About Us
  - Contact Us
  - Careers
  - For Customers
  - Privacy Policy
  - Terms of Use
  - Google Play
  - App Store
- Verify external links open without breaking the current site flow.

### 7.11 Responsive Checks

- Repeat core checks on desktop, tablet, and mobile viewport sizes.
- Verify header remains usable.
- Verify address search remains usable.
- Verify restaurant filters and categories are accessible.
- Verify restaurant cards are readable.
- Verify menu item selection is possible.
- Verify cart and checkout entry are usable.
- Verify no horizontal scrolling or overlapping controls on common mobile widths.

### 7.12 Error Handling

- Monitor console during the main flow.
- Verify third-party script failures do not block ordering flow.
- Verify failed non-critical resources do not break the page.
- Verify API errors, if they occur, show user-friendly UI behavior.
- Verify loading indicators or empty states are shown while data is loading or unavailable.

## 8. Basic API and Network Checks

API checks should only use requests triggered by normal website actions. Do not call private APIs manually outside the web flow.

### 8.1 Home Page Requests

Verify these requests return successful responses during home page load:

- `GET /api/v2/order-session-info`
- `GET /api/v2/user`
- `GET /api/v2/locale-alerts`
- `GET /api/v2/cities-by-state`
- `GET /api/v2/warm-address-search-cache`
- `POST /api/v2/ab-request-batch`
- `POST /api/v2/actual-fees-for-order`

### 8.2 Address Search Requests

Verify address search triggers successful requests:

- `GET /api/v2/lookup-place-id/{placeId}`
- `GET /api/v2/address/geocode?address=Madison,+WI`

Expected result:

- Requests return `200`.
- UI navigates to restaurant search page.
- Address is retained in the page header.

### 8.3 Restaurant Listing Requests

Verify restaurant listing triggers successful requests:

- `GET /api/v2/restaurant-cards/nearby?...`
- `GET /api/v2/active-promotion/coordinates?...`
- `GET /api/v2/reordering/candidates/5`
- `GET /api/v2/marketing/restaurant-list-banner/active/universal`
- `GET /api/v2/promotions/active/locale/1`
- `GET /api/v2/marketing/restaurant-list-banner/active/locale/1`

Expected result:

- Requests return `200`.
- Restaurant cards and filters render correctly.

### 8.4 Restaurant Detail and Menu Requests

Verify restaurant page triggers successful requests:

- `GET /api/v2/restaurants/amber-indian-cuisine?...`
- `GET /api/v2/locales/madison-wi`
- `GET /api/v2/promotions/active/restaurant/43071`
- `GET /api/v2/restaurants/amber-indian-cuisine/menu?isWhiteLabelContext=false`

Expected result:

- Requests return `200`.
- Restaurant details and menu categories render correctly.

### 8.5 Product and Cart Requests

Verify item selection triggers successful requests:

- `GET /api/v2/products/12772049/options`
- `GET /api/v2/products/12772049`

Expected result:

- Requests return `200`.
- Product options page opens.
- Add-to-cart updates UI cart count and subtotal.

### 8.6 Checkout Entry Requests

Verify checkout entry triggers authentication/session requests:

- `GET /api/v2/account-session/configs`
- `POST /api/v2/account-session/new`

Expected result:

- Requests return `200`.
- Unauthenticated user is redirected to sign-in.
- Cart state is preserved.

### 8.7 Third-Party Requests to Monitor

Monitor but do not treat as backend API tests:

- Google Maps scripts and geolocation-related requests.
- Salesforce embedded chat requests.
- Stripe and Google Pay scripts.
- Forter fraud prevention scripts.
- New Relic monitoring requests.
- TikTok analytics script.
- TurnTo review-count resource.

Known frontend/network observations:

- TikTok analytics request timed out.
- TurnTo review-count request returned `404`.
- These should be documented if reproducible, especially if they affect UI, performance, reviews, analytics, or checkout confidence.

### 8.8 General Status Expectations

- `200 OK` for successful EatStreet API requests.
- `3xx` only where redirect is expected, for example checkout to sign-in.
- `4xx` should be handled gracefully in the UI.
- `5xx` should not appear during normal user flow.
- API responses should not expose obvious sensitive user or payment data.
- Request payloads must not include real card data during testing.

## 9. Entry Criteria

Testing can start when:

- The public website is available.
- Browser DevTools are available.
- Test location and restaurant data are prepared.
- Tester understands that backend, database, real payment, and real delivery validation are out of scope.
- No real order will be submitted unless explicitly approved.

## 10. Exit Criteria

Testing can be considered complete when:

- Home page flow has been tested.
- Address search flow has been tested.
- Restaurant list flow has been tested.
- Restaurant detail and menu flow has been tested.
- Add-to-cart flow has been tested.
- Checkout entry/sign-in redirect has been tested.
- Basic API/network requests have been checked.
- Console errors and third-party request failures have been documented.
- No blocker issues are found in search, restaurant list, menu, cart, and checkout entry flows.
- All found defects include steps to reproduce, actual result, expected result, environment, screenshots, and network evidence where useful.

## 11. Deliverables

The expected testing deliverables are:

- Completed test plan.
- Executed test scenarios checklist.
- Screenshots or snapshots when useful.
- Bug reports.
- Console error evidence.
- Network request evidence.
- Final test summary report.


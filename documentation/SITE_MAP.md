# Site Map & Product Analysis — EatStreet Project

## Product essence
EatStreet is an American online food ordering marketplace connecting diners with local restaurants for delivery and takeout Currently, EatStreet claims partnerships with approximately 7,000 restaurants across 250+ U.S. cities, with delivery fulfilled via contracted third-party providers (e.g., UberEats, DoorDash drivers) since August 2023.
Key value propositions:

For diners: Simple, centralized ordering from local restaurants with real-time tracking, group ordering, and exclusive deals.
For restaurants: A marketplace listing + tools for custom websites, branded menu pages, POS integration, digital marketing, and loyalty programs — with no upfront cost, commission-based pricing.

---
## Subsystems (observable)

From a study QA team perspective, EatStreet should be analyzed as a **black-box, user-facing e-commerce and food delivery platform**, with testing efforts focused on observable user interactions and end-to-end flows.

The primary QA focus areas include:

- **Location-based discovery** — address input, validation, and restaurant availability;
- **Restaurant listing and filtering** — search results, sorting, and availability states;
- **Menu browsing and item configuration** — categories, item details, and modifiers;
- **Cart behavior** — item management, quantity updates, and price recalculation;
- **Checkout flow and validation** — required fields, delivery options, and order summary;
- **Authentication and account flows** — sign in, sign up, and user data management;
- **Support and recovery flows** — help center, contact forms, and post-order assistance.

All testing should be based strictly on **visible system behavior**, without assumptions about backend logic or internal system architecture.

---

## Navigation Caveats

- Restaurant availability depends on the user’s address.
- Without a valid address, the main ordering flow may be blocked.
- Some restaurants may be closed, unavailable, or outside the delivery area.
- Checkout may require valid contact information, address, and payment details.
- Some flows may behave differently for guest and registered users.
- Pricing may change based on quantity, modifiers, delivery fees, taxes, or service fees.
- Restaurant Dashboard and internal merchant tools are not publicly testable.
- Real payment and order fulfillment should not be tested in a study project.

--- 

# Site Map

```mermaid
flowchart LR

%% =========================
%% ROOT
%% =========================
Home[Home]

%% =========================
%% MAIN NAVIGATION
%% =========================
Home --> Address["Enter Address"]
Home --> SignIn["Sign In"]
Home --> SignUp["Sign Up"]
Home --> Support["Support"]
Home --> Apps["Apps"]
Home --> About["About Us"]
Home --> Careers["Careers"]
Home --> Partners["For Restaurants"]
Home --> Cities["Cities"]

%% =========================
%% AUTH FLOW
%% =========================
SignIn --> Account["Account"]
SignUp --> Account

Account --> Profile["Profile"]
Account --> SavedAddresses["Saved Addresses"]
Account --> OrderHistory["Order History"]
Account --> Logout["Logout"]

%% =========================
%% SEARCH & DISCOVERY
%% =========================
Address --> RestaurantList["Restaurant Listing"]

RestaurantList --> Filters["Filters & Sorting"]
RestaurantList --> RestaurantPage["Restaurant Page"]

%% =========================
%% RESTAURANT PAGE
%% =========================
RestaurantPage --> Menu["Menu"]
RestaurantPage --> Reviews["Reviews"]
RestaurantPage --> Cart["Cart"]

Menu --> Categories["Menu Categories"]
Categories --> MenuItem["Menu Item"]

MenuItem --> Modifiers["Modifiers"]
Modifiers --> AddToCart["Add to Cart"]

%% =========================
%% CART (CRITICAL)
%% =========================
AddToCart --> Cart

Cart --> CartItems["Cart Items"]
Cart --> UpdateQty["Update Quantity"]
Cart --> RemoveItem["Remove Item"]
Cart --> PriceSummary["Price Summary"]
Cart --> Checkout["Checkout"]

%% =========================
%% CHECKOUT (CRITICAL FLOW)
%% =========================
Checkout --> CKContact["Contact Info"]
CKContact --> CKDelivery["Delivery / Pickup"]
CKDelivery --> CKAddress["Address Details"]
CKAddress --> CKInstructions["Instructions"]
CKInstructions --> CKCoupon["Apply Coupon"]
CKCoupon --> CKPayment["Payment Form"]
CKPayment --> CKSummary["Order Summary"]
CKSummary --> PlaceOrder["Place Order"]

%% =========================
%% SUPPORT
%% =========================
Support --> HelpCenter["Help Center"]
Support --> FAQ["FAQ"]
Support --> ContactForm["Contact Form"]
Support --> ChatSupport["Chat Support"]

%% =========================
%% PARTNERS (LIMITED SCOPE)
%% =========================
Partners --> MerchantInfo["Partner Info"]
Partners --> MerchantSignup["Merchant Sign Up"]
Partners --> MerchantLogin["Merchant Login"]

%% =========================
%% APPS / INFO
%% =========================
Apps --> IOSApp["iOS App"]
Apps --> AndroidApp["Android App"]


%% =========================
%% STYLES
%% =========================

%% depth levels
classDef depth0 fill:#14532d,stroke:#052e16,color:#fff
classDef depth1 fill:#16a34a,stroke:#14532d,color:#fff
classDef depth2 fill:#facc15,stroke:#ca8a04,color:#422006
classDef depth3 fill:#fb923c,stroke:#ea580c,color:#431407

%% auth
classDef auth fill:#3b82f6,stroke:#1d4ed8,color:#fff

%% critical
classDef critical fill:#ef4444,stroke:#7f1d1d,color:#fff

%% =========================
%% APPLY STYLES
%% =========================

class Home depth0

class Address,SignIn,SignUp,Support,Apps,About,Careers,Partners depth1
class RestaurantList,RestaurantPage,Menu,Cart,Checkout depth2
class Categories,MenuItem,Modifiers,AddToCart,CartItems,UpdateQty,RemoveItem,PriceSummary,CKContact,CKDelivery,CKAddress,CKInstructions,CKCoupon,CKSummary depth3

class Account,Profile,SavedAddresses,OrderHistory,Logout auth

class Cart,Checkout,CKPayment,PlaceOrder critical
```
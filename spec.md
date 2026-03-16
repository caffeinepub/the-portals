# The Portals — Version 38 Structure Update

## Current State
Single-file React app (~15,801 lines, App.tsx). Celestial Glassmorphism design (#05070A bg, #00FFFF cyan, Orbitron+Rajdhani, PKR). Categories in home screen: Maintenance, Health, Rentals, Education, Shopping, Grocery, Stationery, House, Transport, Dry-Cleaner, Food Parcels. Screen-state navigation. Maintenance sub-categories go directly to provider list. Payment flow: PaymentPlanScreen → PaymentLockedScreen → OtpScreen → SuccessScreen → InvoiceScreen.

## Requested Changes (Diff)

### Add
- New Maintenance sub-categories: **Cleaner** (🧹), **Car Tech** (🚗), **Labour** (👷) — same provider list flow as existing Maintenance subs
- Labour: auto-fill OTP (pre-populate OTP field on OtpScreen)
- Provider profile picture field in PROVIDERS data array (simulate with avatar/initials fallback if no pic)
- Wages field in PROVIDERS data (PKR/day, set at registration)
- Invoice: Start Date and End Date fields
- Invoice: Share button (sends to both User and Service Provider simultaneously)
- Other Bank payment expanded fields: Bank Name input, Bank Account input, Amount (auto-filled), Pay button (skip Lock Payment screen entirely), OTP, Invoice
- Balance check for ALL services: if userBalance < total → go to Top-Up screen; if sufficient → proceed to OTP then Invoice directly
- General Store category (merge of Shopping + Grocery) with all sub-categories from both

### Modify
1. **Home Screen Categories — Alphabetical Order**: Dry-Cleaner, Education, Food Parcels, General Store, Health, House, Maintenance, Rentals, Stationery (→ Book Store), Transport
2. **Maintenance provider cards** (all sub-categories: Plumber, Electrician, Carpenter, Painter, AC Tech, Solar Tech, Mason, + new Cleaner, Car Tech, Labour):
   - Show profile picture (circular avatar with initials fallback)
   - Show wages at top (PKR/day from provider registration)
   - Experience and distance on next line
   - Message button: same style/size as Call button (currently Message is smaller)
3. **Maintenance payment flow**: Other Bank → Bank Name, Bank Account, Amount (auto), Pay button → OTP → Invoice (remove PaymentLockedScreen for bank method)
4. **Maintenance invoice**: Title = Name of Service, Provider Name, Amount, Start Date, End Date; Save button; Share button (shares to User and Provider simultaneously)
5. **Medical Store flow**: Item selection → Book Order → Provider list cards showing: Name of Store, breakdown of selected items (Item Name, Qty, Price per item), Total Amount, Rider Charges → Select Provider → Payment Plan → auto-fill OTP → Invoice. Remove PROVIDER PRICING screen from this flow entirely.
6. **Rentals - Passenger**: Form: Destination (GPS search), Pickup Location (auto-fill current GPS), Date, Time, Vehicle Type chips (Bike, Rikshaw, Car, Van), Total Passengers, Comfort (AC) / Economy (Non-AC) toggle → Provider list cards showing Vehicle Type, Comfort/Economy, Amount → Select Provider → Payment Plan. Remove all other intermediate screens.
7. **Rentals - Commercial Property**: Form flow: Area → Type of Service chips (Office, School, Showroom, Warehouse, Coaching Centre, Shop) → Total Rooms input → Duration input → Book Service button → Provider card (Name, Location, Type of Service, Duration in Months, Amount monthly + Advance) → Confirm Service → Payment Plan. Remove all other screens.
8. **Rentals - Commercial Vehicles**: Form flow: Area input → Loading Point input → Unloading Point input → Type of Load input → Vehicle Type chips (Mazda, Loader, Truck, Trolley, Pickup) → Date → Time → Book Service button → Provider card (Name, Fare, Type of Vehicle, Model) → Confirm Provider → Payment Plan. Remove all other screens.
9. **Education - Home Tutor**: Show teacher cards directly (Name, Experience in years, Subject, Distance, Fees per hour) → Confirm Home Tutor button → Payment Plan. Remove all other intermediate screens.
10. **Education - Coaching Centers**: Remove the intermediate Education Providers screen. After form (Grade, Subject, Shift, Date), go directly to Payment Plan.
11. **Education - Schools**: Remove the intermediate Education Providers screen. After form (Grade, Area), go directly to Payment Plan.
12. **Shopping & Grocery → General Store**: Merge both categories into one new category called "General Store". All existing Shopping sub-categories (Dairy & Eggs, Spices, Cleaning Supplies, Personal Care, Bakery & Bread, Tea & Coffee) AND all Grocery sub-categories (Rice & Grain, Oils & Ghee, Home Hygiene, Fruits & Vegetables) become sub-categories of General Store. Flow for each: Item List (Dropdown), Qty, Unit, Delivery Address, Book Order → Select Provider → Provider Card (Name of Provider, Breakdown: Item Name/Qty/Unit/Price, + Rider Charges) → Confirm Order (rename from Confirm Booking) → Payment Plan. Remove all other screens/flows.
13. **Stationery → Book Store**: Rename category everywhere. Same flow as General Store sub-categories.
14. **House - Drinking Water**: Brand Name selector (Aquafina, Nestle, Local brands), Bottle Size chips (500ml, 1L, 1.5L, 5L, 10L, 19L, 20L), Total Bottles counter, Delivery Location input → Provider Card (Name, Bottle Size, Total Bottles, Price, Rider Charges) → Payment Plan. Remove all other screens.
15. **House - Gas Cylinder**: Pickup Location, Destination, Gas Type selector (LPG, LNG, CNG), Cylinder Size chips (2kg, 5kg, 8kg, 10kg, 12.5kg, 20kg), Total Fill (kg) input → Provider Card (Name, Cylinder Type, Gas Type, Total Fill (kg), Price per Kg, Total, +Loading & Off-Loading Charges, +Transport Charges, Net Total) → Payment Plan. Remove all other screens.
16. **Dry-Cleaner**: Type of Cloth list (multi-select: Salwar Kameez, Pant Shirt, Coat, Jacket, Curtain, Towel), Service Type (Washing/Iron/Washing+Iron), Total Qty, Pickup Location → Find button → Provider card (Name, Rate per item: 300 for Salwar Kameez/Pant Shirt/Coat/Jacket; 500 for Curtain; 400 for Towel; +Service Charges ≤1km: 250, else 350) → Select Provider → Payment Plan. Remove all other screens.
17. **Food Parcels**: Show Provider cards directly (Daily/Weekly Food Menu, Food Type: Meal/Tea/Fast Food, Price Per Day/Per Order), Delivery Location input, Total Meals input, Total Amount calculated → Payment Plan.
18. **Invoice updated for all services**: Title = Name of Service, Provider Name, Amount, Start Date, End Date, SAVE button, SHARE button (shares receipt to User and Service Provider simultaneously).

### Remove
- Shopping as separate home category (merged into General Store)
- Grocery as separate home category (merged into General Store)
- PaymentLockedScreen step for Other Bank payment method
- PROVIDER PRICING screen from Medical Store flow
- Education Providers intermediate screen from Coaching Centers and Schools flows
- All extra/dead screens from the flows listed above

## Implementation Plan
1. Update SERVICES array: add Cleaner, Car Tech, Labour to Maintenance; rename Stationery→Book Store; add General Store as category containing all Shopping+Grocery sub-categories
2. Update PROVIDERS array: add wages (PKR/day), profilePic (null — use initials), for Cleaner/Car Tech/Labour providers
3. Reorder home screen categories alphabetically
4. Maintenance NearbyProvidersScreen: show profile picture (circular, initials fallback), wages on top, experience+distance below; Message button same styling as Call button
5. PaymentPlanScreen: add bank name + bank account inputs for 'Other Bank' method; skip locked screen for bank payment, go directly to OTP
6. All payment flows: check balance first; if insufficient → TopUp screen; if sufficient → proceed
7. InvoiceScreen: add provider name, start date, end date, share button that notifies both parties
8. Rewrite Medical Store flow in ServiceBookingFormScreen: remove provider pricing detour, item selection → find providers → provider cards with breakdown → payment
9. Rewrite Passenger form: GPS destination, auto-fill pickup, vehicle type chips, comfort/economy toggle, provider list
10. Rewrite Commercial Property form: area → type chips → rooms → duration → provider cards
11. Rewrite Commercial Vehicles form: area → loading/unloading → load type → vehicle type chips → provider cards
12. Simplify Home Tutor: show teacher cards directly, confirm, payment
13. Skip Education Providers screen for Coaching Centers and Schools
14. Merge Shopping + Grocery → General Store; update category grid, SERVICES, PROVIDERS
15. Rename Stationery → Book Store throughout
16. Rewrite Drinking Water form: brand, bottle size chips, total bottles, delivery location
17. Rewrite Gas Cylinder form: pickup, destination, gas type, cylinder size, total fill, provider card with full charges breakdown
18. Rewrite Dry-Cleaner form: cloth multi-select, service type, qty, pickup → provider cards with itemized rates
19. Rewrite Food Parcels: show provider cards with menu/type/price, delivery location, total meals, total amount

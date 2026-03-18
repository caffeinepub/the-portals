# The Portals — Clean Slate Refactor

## Current State
App.tsx is ~17,581 lines with heavy dead code accumulation:
- Removed categories still have active code branches (Food Parcels HomeChef, Security, Tech, Education)
- Dead state variables prefixed with `_` throughout
- `ServiceBookingFormScreen` has branching logic for 10+ removed categories
- `ALL_CATEGORIES` references non-existent categories (Shopping, Grocery, Accessories)
- Inline JSX blocks for `stationary-subs` and `general-store-subs` inside PortalApp instead of components
- Orphaned SERVICES/PROVIDERS data for removed categories
- Dead utility functions (_handleGpsPickup, _MEDICINE_ITEMS, etc.)
- WEEKLY_MENU data only used by dead HomeChefOrderFormSection

## Requested Changes (Diff)

### Add
- Nothing new — clean placeholder screens for each category

### Modify
- Strip App.tsx from ~17,581 lines to a clean ~3,000 line foundation
- Each category tile navigates to a clean CategoryPlaceholderScreen
- Keep all core screens: Splash, Onboarding, Login, Register (Provider + Customer), Home, Profile, Settings, Chat, Tasks, Admin Portal, Payment Plan, OTP, Invoice, Success
- Keep shared design components: BottomNav, BackButton, ScreenHeader, GlassCard styles

### Remove
- HomeChefOrderFormSection (~600 lines, dead)
- ServiceBookingFormScreen's dead branches: isHomeChef, isHomeCleaning, isTechSupport, isTechAccessories, isSecurity (~2000 dead lines)
- AudioPlayCard and voice notes logic (feature removed)
- _PROFESSIONS, _categoryProviders, _MEDICINE_ITEMS, _workScopeSubmitted, setUserLocation stubs
- ALL_CATEGORIES dead references (Shopping, Grocery, Accessories, Security, Tech)
- All specialized sub-screens (Rental forms, House forms, Health forms, Workforce forms) — to be rebuilt cleanly per category
- ProviderPricingScreen, ProviderConfirmedScreen (dead flow)
- PaymentLockedScreen (removed per user request)
- WEEKLY_MENU, dead SERVICES/PROVIDERS entries
- stationary-subs and general-store-subs inline JSX in PortalApp
- All screen states for removed categories

## Implementation Plan
1. Write clean App.tsx with only essential screens and a CategoryPlaceholderScreen
2. Home screen shows 7 categories alphabetically: General Store, Health, House, Rentals, Stationary, Transport, Workforce
3. Tapping any category shows a placeholder screen ("Category: X — Coming Soon")
4. Core payment flow kept (PaymentPlanScreen, OtpScreen, InvoiceScreen, SuccessScreen)
5. All auth flows kept intact
6. Admin portal kept intact
7. All SERVICES/PROVIDERS data stripped to just placeholder entries
8. Validate: lint + typecheck + build

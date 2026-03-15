# The Portals — Full Code Audit & Optimization

## Current State
App.tsx is ~15,613 lines with multiple screens, data arrays, and components inlined. Multiple screen files exist under src/frontend/src/screens/. The app has accumulated 30+ versions of structural updates with potential dead code, unused imports, broken flows, and inconsistencies.

## Requested Changes (Diff)

### Add
- Ensure OTP verification screen checks user balance before allowing payment; show low-balance modal if insufficient
- Ensure all flows end in Payment Plan → OTP → Success/Invoice screens
- Verify voice note Speech-to-Text (Output A) + play-only attachment (Output B) works in ALL work scope screens
- Ensure GPS auto-fill works in Food Parcels, Medical Store delivery address
- Confirm dynamic service counter on Home uses simulated live data (refreshes every 60s, loading state shows "-- ACTIVE", zero state shows "SEARCHING FOR GATEWAYS...")

### Modify
- Remove all dead code: unused imports, unused state variables, unused functions, unreachable code blocks
- Remove all references to Agri-Pharma, Security, Book Store, Maid Services, Grocery Store, Utensils, Tech/IT from home screen categories
- Home screen categories must be exactly: Repairs, Health, Rentals, Education, Shopping, Grocery, Stationery, Transport, Dry-Cleaner, Food Parcels
- Fix ALL item entry forms: Shopping subcategories, Grocery subcategories, Stationery Shop — predefined item lists with qty +/-, auto-price, running total, Find Providers / Open Portal CTA
- Fix Repairs flow: all 6 sub-categories (Plumber, Electrician, Carpenter, Painter, HVAC Tech, Mason) → Work Scope modal → Find Providers → provider list with material+service rates → select provider → Confirm Service → Payment Plan
- Fix Medical Store: item list entry (20 predefined medicines with qty, unit, auto-price) → running total → Confirm Order → provider list → Payment Plan. Charges: Service PKR 150 + Rider PKR 150 + Medicine Total
- Fix Dry-Cleaner: provider list with per-item pricing → select provider → item entry form (cloth type, qty, service type) → auto-calculated invoice → Payment Plan
- Fix Food Parcels: provider list with weekly menu → select provider → confirm booking → Daily/Weekly/Monthly → GPS address auto-fill → Payment Plan
- Fix Coaches Ticket: From City, To City, Seats, Date, Time → Find Providers → list with fare → select provider → Payment Plan
- Fix Dome Service: same as Coaches Ticket
- Fix Pakistan Railway: Departure, Destination, Seat Type, Seats, Date, Time → Find Providers → provider list → Payment Plan → e-ticket
- Fix Shopping subcategories: use predefined item dropdowns with auto-price, qty selection, running total, Find Providers → provider list → payment
- Fix Grocery subcategories: same predefined item + qty + auto-price flow for Rice & Grain, Oils & Ghee, Home Hygiene, Fruits & Vegetable
- Fix Stationery Shop: predefined item list, qty, unit → Find Providers → select provider → payment
- Ensure Portal ID to Portal ID is primary payment method; JazzCash 2nd, Easypaisa 3rd, Other Bank 4th
- Ensure The Portals Bank Account is never shown in any UI
- Repair Cancel button in Work Scope modal navigates back to Repairs screen
- Ensure all provider cards hide rates until task is confirmed
- Ensure Commercial Property bookings only allow Monthly/Yearly duration
- Ensure all bottom nav icons are color-coded (cyan Home, amber Tasks, green Chat, purple Profile) with Orbitron font labels
- Ensure profile screen options all navigate to correct sub-screens
- Fix any TypeScript errors and lint warnings
- Optimize: split large render functions, memoize static data, lazy-load heavy sections

### Remove
- All dead/unreachable code blocks
- Any unused imports (React hooks, Lucide icons, etc.)
- Any unused state variables and handler functions
- Agri-Pharma references anywhere
- Security category references
- Book Store references
- Maid Services references
- Grocery Store sub-category
- Utensils sub-category from Grocery
- The Portals Bank Account from all UI
- Tech/IT from home screen categories
- House from home screen categories (it's accessed elsewhere)
- Any hardcoded "127" or "49" for service counter

## Implementation Plan
1. Audit and clean imports in App.tsx
2. Remove dead data entries from SERVICES, PROVIDERS arrays
3. Remove dead/unused screen functions
4. Fix home screen category list to exactly the 10 required categories
5. Fix all service booking flows end-to-end
6. Fix all item entry forms (Shopping, Grocery, Stationery)
7. Fix Repairs flow for all 6 sub-categories
8. Fix Medical Store, Dry-Cleaner, Food Parcels flows
9. Fix Transport booking flows (Coaches, Dome, Railway)
10. Fix Payment Plan flow and OTP verification
11. Ensure all bottom nav, profile, and settings work
12. Validate (typecheck + build), fix all errors

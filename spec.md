# The Portals

## Current State
Full-stack celestial glassmorphism service marketplace app for Pakistan with React frontend. App has 22 versions of updates. The last build failed. The current codebase has all screens but some features from the latest structural update (v22) may be missing or broken.

## Requested Changes (Diff)

### Add
- IT/Tech: Two tabs — IT Accessories (product list) and IT Technician (service providers)
- Transport: Coaches Ticket, Dome Service, Van Service, Pakistan Railway sub-categories
- Stationary as a separate home screen category (moved from Shopping)
- Groceries: 4 sub-categories — Rice & Grain, Oils & Ghee, Home Hygiene, Fruits & Vegetable
- Portal ID to Portal ID as primary payment method (replaces The Portals Bank Account in UI)
- Repair: Mason sub-category, Urdu/Sindhi language support in work scope, voice note limits (30s, max 3)
- Property Rental: spec-first flow with 'Open Portal' button showing provider list
- Medicine/Agri-Pharma: item list flow with 'Open Portal' button
- Shopping: Remove Supermarket and Clothing Store sub-categories
- Dynamic service counter on home screen (not hardcoded 127)

### Modify
- Home screen: Remove Security category, dynamic Portals to Services count
- Payment Plan: Remove The Portals Bank Account from user-facing UI; add Portal ID to Portal ID as first option
- Repair work scope: RTL support for Urdu/Sindhi, voice note 30s limit and max 3 restriction, cancel returns to Repairs screen
- Rental: Traveler Tickets moved to Transport
- Groceries sub-categories updated

### Remove
- Security category from home screen
- The Portals Bank Account from payment UI visible to regular users
- Supermarket and Clothing Store from Shopping
- Stationary from Shopping (moved to own category)
- Traveler Tickets from Rentals (moved to Transport)

## Implementation Plan
1. Remove Security from home categories grid
2. Make Portals to Services counter dynamic (count available services, not hardcoded)
3. Add IT tabs: IT Accessories + IT Technician
4. Add Transport sub-categories: Coaches Ticket, Dome Service, Van Service, Pakistan Railway
5. Update Payment Plan: remove The Portals Bank Account from UI, add Portal ID to Portal ID as first option with instant ID verification flow
6. Update Repair: add Mason, add language selector (English/Urdu/Sindhi) with RTL support, voice note limits, cancel button fix
7. Update Rental: remove Traveler Tickets, update Property Rental to spec-first flow
8. Update Health: Medicine & Agri-Pharma item list with Open Portal flow
9. Update Shopping: remove Supermarket and Clothing Store
10. Create Stationary as separate home screen category
11. Update Groceries: Rice & Grain, Oils & Ghee, Home Hygiene, Fruits & Vegetable

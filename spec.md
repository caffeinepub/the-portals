# The Portals

## Current State
Single-file React app (~16k lines, App.tsx). Celestial Glassmorphism design. Home screen categories (alphabetical): Book Store, Dry-Cleaner, Education, Food Parcels, General Store, Health, House, Maintenance, Rentals, Transport. Book Store has one SERVICES entry and uses item dropdown → confirm order → directly to Payment Plan (skips provider selection). Stationery exists only in ALL_CATEGORIES (AllServicesScreen browse), not as a home screen category.

## Requested Changes (Diff)

### Add
- **Stationary** as a new home screen main category (alphabetical: between Rentals and Transport)
  - Flow: Item dropdown list → qty → unit → price auto-filled → Add New → Breakdown Summary → Total → Delivery Address → Book Order → Nearby Provider List card (Provider name, item breakdown per user, Total + Service Charges PKR 50 + Rider/Delivery PKR 150) → Select Provider → Payment Plan
  - Item list: Notebooks, Pens, Pencils, Rulers, Erasers, Highlighters, Geometry Box, etc. with auto-prices
- **Accessories** as a new home screen main category (alphabetical: between Book Store and Dry-Cleaner... actually 'A' comes first)
  - Flow: Item dropdown list (Bags, Water Cooler, etc.) → qty → unit → price auto-filled → Add New → Summary → Total → Delivery Address → Book Order → Nearby Provider List card (Provider Name, item breakdown per user, Total Amount + Service Charges PKR 50 + Rider/Delivery PKR 150) → Select Provider → Payment Plan
  - Item list: School Bag, Laptop Bag, Backpack, Handbag, Travel Bag, Water Cooler, Water Bottle, Lunch Box, Umbrella, Belt, Sunglasses, Headphones, etc. with auto-prices

### Modify
- **Book Store**: Remove sub-category step — tapping Book Store on home screen goes directly to serviceBooking form (skips AllServicesScreen intermediary)
- Add Accessories and Stationary to SERVICES array, CATEGORY_META, ALL_CATEGORIES
- Add ACCESSORIES_ITEMS array with item/price/unit data
- Update detection flags (isAccessories, isStationary) in ServiceBookingFormScreen
- Update isOrderable condition to include accessories and new stationary
- Update item dropdown selection logic to use ACCESSORIES_ITEMS for accessories
- Update totalPayment: accessories and stationary use Service PKR 50 + Rider PKR 150 (like Book Store)
- Update navigation: Stationary and Accessories go to providers after Book Order (not skip like Book Store)
- Home screen categories updated alphabetically (Accessories added, Stationary added)

### Remove
- Nothing removed from existing categories

## Implementation Plan
1. Add ACCESSORIES_ITEMS array after BOOK_STORE_ITEMS
2. Add SERVICES entries for Stationary and Accessories
3. Add to CATEGORY_META with emoji/color
4. Add to ALL_CATEGORIES list
5. Update home screen categories array (add Accessories, Stationary in alphabetical order)
6. Update onAllServices handler: Book Store, Accessories, Stationary go directly to serviceBooking
7. In ServiceBookingFormScreen: add isAccessories and update isStationary flag to cover new Stationary category
8. Update isOrderable to include accessories
9. Update item dropdown logic to handle ACCESSORIES_ITEMS
10. Update totalPayment so accessories+stationary use PKR 50 service + PKR 150 rider
11. Update needs routing: accessories + stationary go to serviceBooking → providers (not skip providers)

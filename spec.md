# The Portals — Structure Update Version 20+

## Current State
Full celestial glassmorphism app with 20+ screens: splash, login, registration (user/provider), home dashboard, services grid, nearby providers, provider confirmed, booking forms (health, rentals, repairs, education, home, groceries), payment plan, OTP/payment locked, success/invoice, chat, tasks, profile, settings, privacy policy. Bottom nav with Home/Tasks/Chat/Profile. Orbitron + Rajdhani fonts, deep space background, neon cyan theme.

## Requested Changes (Diff)

### Add
- Welcome greeting with small profile icon (avatar) on top-right of home screen
- Colorful icons for bottom nav (Home, Tasks, Chat, Profile) with Orbitron/Rajdhani font styling matching "The Portals" title font color
- Functional search bar on home screen searching services/keywords
- Tasks screen split into two tabs: "Current Tasks" (in-progress) and "Tasks History" (date/service wise, chat history)
- Help & Support FAQ screen (for end-users and service providers)
- User ratings system displayed to service providers; users can earn/use Qiks tokens
- Repair sub-category: work scope prompt modal before provider selection (text or voice note), encrypted communication note, internal message/call dialog (no phone numbers shown)
- Payment plan: The Portals Bank Account first, then JazzCash/Easypaisa/Other; show ID holder name when Unique ID entered
- OTP boxes responsive fix (fit to screen)
- Health: item list with quantities (20 basic medicine items with auto-price), GPS auto-fill delivery address, payment mode selector (online/COD prefer online), show provider list after item list complete with invoice, rename Pharmacy to Agri-Pharma with leaf/herb icon
- Rentals: "Now" option (immediate) vs date/time; estimated reaching time for "Now" bookings; OTP generated after task completion; property rental rate set by provider at registration
- Education: rename Tutor to Home Tutor with level/subject prompt before provider list; add Coaching Centers/Academies category; add Schools category
- Home: add Female/Male Maid category; add Dry-Cleaner category (pickup/deliver, item type list with auto rates); separate Shopping from Home; Chef/Gardner/Cleaner on daily basis; rename Home Chef to Food Parcels with food type selection (Tea/cold drinks/meals); Food Parcels on daily basis
- Shopping: new top-level category with 6 sub-categories: Dairy & Eggs, Spices, Cleaning, Personal Care, Bakery & Bread, Tea & Coffee; item list with auto-prices; provider selection after list
- Profile options fully working: edit profile, payment method, transaction history, top-up, help & support, delete account

### Modify
- Home categories grid: fix visibility — all categories (including Security, Tech, Transport, Shopping, etc.) must be visible and scrollable; icon sizes consistent
- Bottom nav labels: use Orbitron/Rajdhani font matching "The Portals" branding color (cyan), same current size
- Tasks tab: split into Current Tasks and Tasks History tabs
- Health services: medical store/pharmacy uses item list flow; delivery address from GPS
- Rentals booking: add "Now" toggle; show ETA on confirmation
- Repair flow: add scope of work modal popup before provider list

### Remove
- Contact phone numbers from provider cards (use internal messaging only)

## Implementation Plan
1. Home screen: add user greeting + profile avatar top-right; fix category grid to show all categories with scroll; make bottom nav icons colorful (use emoji or colored lucide icons) with Orbitron font labels in cyan
2. Search bar: implement functional keyword search filtering services and categories
3. Tasks screen: add two-tab layout (Current Tasks / Tasks History)
4. Profile screen: wire up all menu items (edit profile modal, payment method screen, transaction history, top-up, help & support, delete account) as navigable screens
5. Help & Support FAQ screen: add FAQ accordion for users and providers
6. User ratings: add rating display in profile and show to providers; user Qiks balance
7. Repair flow: add work scope modal dialog before provider list; remove phone numbers; update payment order
8. OTP screen: fix box sizing to be responsive/fit screen
9. Health: add 20-item medicine list with auto-prices; GPS delivery address; payment mode; rename Pharmacy to Agri-Pharma; show provider list after item selection
10. Rentals: add Now toggle; ETA on confirmation; OTP after task complete
11. Education: rename to Home Tutor with prompts; add Coaching Centers and Schools categories
12. Home: add Maid, Dry-Cleaner; rename to Food Parcels; separate Shopping; daily basis for Chef/Gardner/Cleaner
13. Shopping: create as category with 6 sub-categories and item list flow

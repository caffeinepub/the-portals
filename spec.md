# The Portals

## Current State
- Splash screen has a custom inline wormhole logo (CSS + text span)
- Login screen shows only text "THE PORTALS" as the logo
- OTP screen has 4 digit boxes but the OTP is not generated per-task or shown to the portal user
- No invoice save/download option after payment
- No explicit security/encryption UI indicators
- Backend uses Motoko with verifyHandshake for OTP

## Requested Changes (Diff)

### Add
- PortalLogo SVG component on SplashScreen (replacing custom inline logo, same large size ~120px)
- PortalLogo SVG component on LoginScreen (replacing text-only logo, ~100px size)
- OTP generation per task: display a system-generated 4-digit OTP code on the PaymentLocked screen visible to Portal user; OTP screen prompts user to enter that code to verify
- Invoice save/download screen after payment success with all transaction details (service title, service charges paid from Portal user ID, paid to provider, amount, date/time, reference number)
- "Download Invoice" and "Save Invoice" buttons on SuccessScreen and a dedicated InvoiceScreen
- Security trust badges: end-to-end encryption, 256-bit AES, secure payment icons on payment screens
- OTP display on locked screen so Portal user sees the code to share with/use for verification

### Modify
- SplashScreen: replace inline P logo with PortalLogo component at xl/120px size with existing orbit rings
- LoginScreen: replace text-only logo header with PortalLogo component (100px) + app name text below it
- PaymentLocked screen: show the generated 4-digit OTP in a glowing display box labeled "YOUR PAYMENT OTP" with copy button
- OTP input screen: update label to reflect user must enter the OTP code that was generated for this task
- SuccessScreen: add Invoice section showing simplified invoice + Save Invoice button
- Payment screens: add security badges (E2E encryption, payment protection)

### Remove
- Inline wormhole P logo code from SplashScreen (replaced by PortalLogo)
- Text-only logo from LoginScreen header (replaced by PortalLogo + text)

## Implementation Plan
1. Update SplashScreen to use PortalLogo component (120px) with orbiting ring animations around it
2. Update LoginScreen header to use PortalLogo (100px) centered above the app title text
3. Add OTP generation logic: in PaymentLockedScreen generate a random 4-digit code on mount and display it prominently with a copy button and label "YOUR TASK OTP"
4. Update OTP input screen description to say "Enter the 4-digit OTP code generated for this task"
5. Add InvoiceScreen component with: service title, Portal User ID, Provider name, amount paid, date, reference number, download/save button (triggers browser print/download)
6. Add "View Invoice" button on SuccessScreen navigating to InvoiceScreen
7. Add security trust badges on PaymentPlan and OTP screens: shield icons for E2E encryption, 256-bit AES, secure payment
8. Validate and build

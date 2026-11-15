# Shrivastralya VastraPOS

Billing, stock, tailoring, parcel and store-credit app for a ladies suits & sarees shop.
Works on Android phones (install from Chrome) and computers, also without internet.

## Files
- `index.html` – the whole app
- `firebase.js` – Firebase SDK bundle (v11) used for Google sign-in and sync
- `sw.js` – offline support; the app page is always fetched fresh when online, so updates show up
- `manifest.json`, `icons/` – Android install
- `lib/` – QR code (qrcodejs, MIT), barcode (JsBarcode, MIT) and camera scanner (html5-qrcode, Apache-2.0) libraries
- `firestore.rules` – security rules template (paste into Firebase console with your staff emails)

## How sync works
- Staff sign in with Google. Only the Gmail addresses listed in the Firestore rules can read or write anything.
- Each product, bill, tailoring order, parcel, credit note and staff member is its own record under
  `stores/<store code>/…`, so two devices billing at the same time never overwrite each other.
- Stock and credit-note balances are saved as changes (+/−), so simultaneous sales on two devices both count.
- Without internet the app keeps working; changes wait on the device and upload by themselves.
- Each device has its own bill series letter (INV-A0001 on one device, INV-B0001 on another), so numbers never clash.
- Product photos are stored once in the cloud and downloaded once per device.

## Setup (once)
1. Firebase console → your project → **Authentication → Sign-in method** → enable **Google**.
   **Authentication → Settings → Authorized domains** → add the site address (e.g. `yourname.github.io`).
2. **Firestore Database** → create (production mode) → **Rules** → paste `firestore.rules` with your Gmail addresses → Publish.
3. **Project settings → Your apps → Web app** → copy `firebaseConfig`, then either paste it in the app
   (Settings → Multi-Device Sync) on each device, or put it in `index.html` at `const FIREBASE_CONFIG`.
4. Host these files on HTTPS (e.g. GitHub Pages) and open the site on each device.

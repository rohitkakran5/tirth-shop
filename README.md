# Shrivastralya VastraPOS

Billing, stock, tailoring, parcel and store-credit app for a ladies suits & sarees shop.
Works on Android phones (install from Chrome) and computers, also without internet.

## Files
- `index.html` – the whole app
- `firebase.js` – Firebase SDK bundle (v11) used for Google sign-in and sync
- `sw.js` – offline support (the app opens even without internet)
- `manifest.json`, `icons/` – Android install
- `lib/` – QR code (qrcodejs, MIT), barcode (JsBarcode, MIT) and camera scanner (html5-qrcode, Apache-2.0)
- `firestore.rules` – security rules template (put the owner Gmail address(es) in `isOwner()`, paste in Firebase console)

## How sync works
- Without Google sign-in the app works on one device only ("Local Mode").
- After Google sign-in, data lives in Firestore under `stores/main-shop/…`
  (`products, sales, tailorOrders, shipments, creditNotes, images, staff, meta/roster`).
  The first sign-in on a device uploads whatever that device already had.
- Each record is written on its own; stock, returned pieces and voucher balances are saved as
  +/− changes, so two devices billing at the same time never overwrite each other.
- Offline: changes are kept on the device (Firestore offline cache) and upload by themselves.
- Roles are enforced by Firestore rules per Gmail: owner (listed in the rules), and staff added
  from the app (Users & Cloud) as counter / inventory / tailor. Staff PINs are a quick screen lock
  on top of that; on a device signed in with a staff Gmail no PIN user can go beyond that Gmail's role.
- Each device has its own bill series (INV-A0101 on one, INV-B0101 on another).
- Devices keep the last 180 days of bills live; the owner can load older bills from Reports.

## Setup
See `SETUP-HINDI.md`.

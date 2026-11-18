# VastraPOS — Setup (sirf ek baar)

## 1. Firebase rules lagayein (sabse zaroori)
1. https://console.firebase.google.com → project **tirth-shop** kholein.
2. Left side **Firestore Database → Rules** tab.
3. Wahan jo likha hai sab hata kar `firestore.rules` file ka poora text paste karein.
   `'OWNER_EMAIL_1@gmail.com'` ki jagah apna Gmail likhein (chhote letters me).
4. **Publish** dabayein.

> Google sign-in aur `rohitkakran5.github.io` domain pehle se on hain. Agar app kisi aur website par
> chalayein to **Authentication → Settings → Authorized domains** me us website ka naam jodein.

## 2. App ko website par daalein
Ye saari files GitHub repo (tirth-shop) me daal dein — website https://rohitkakran5.github.io/tirth-shop/ par khulegi.

## 3. Computer par (Owner)
1. Website kholein → **Owner** chunein → PIN **1111** → app naya PIN banwayega (1111/1234 jaise nahi chalenge).
2. Neeche **🌐 Google Cloud Sync** dabayein → apne Owner Gmail se sign in.
   Is device ka purana data apne aap cloud par chala jayega. Upar **● Cloud Synced** dikhna chahiye.
3. **⚙️ Users & Cloud** → har staff ka naam, **Gmail**, role (Counter / Stock / Tailor) aur 4-digit PIN daal kar
   **Create User Account** dabayein. Purane default users (Counter Billing Staff, etc.) ko **Remove** kar dein.

## 4. Staff ke phone par
1. Chrome me website kholein → (menu → *Add to Home screen* se app install kar sakte hain).
2. **🌐 Google Cloud Sync** → staff apne Gmail se sign in kare.
3. Apna naam chun kar apna PIN daale. Bas — ab sab devices ka stock aur bill ek saath chalega.

## Roz ke kaam me dhyan rakhein
- Upar ka badge: **● Cloud Synced** = sab upload ho gaya. **📴 Offline** = net nahi hai, bill banate rahiye,
  net aate hi apne aap upload ho jayega.
- Har device ki bill series alag hoti hai (INV-AB0101, INV-KM0101…). Owner **Users & Cloud → Bill Series Badlein** se badal sakta hai.
- Hafte me ek baar **Revenue & Reports → Export JSON Backup** se backup le lein.
- GST: "GST Auto" chunne par har item par 5% (₹2500 tak) / 18% (usse upar) lagta hai. Apne CA se ek baar confirm kar lein.

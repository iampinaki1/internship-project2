# HB+ Intern Portal

A cross-platform authentication portal built with **React Native** (mobile) and **React Native for Web + Vite** (browser). Users log in with Google OAuth and are granted access only if their email belongs to the `@gmail.com` domain.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile (Android/iOS) | React Native 0.88 |
| Web (browser) | React Native for Web + Vite 8 |
| Auth — Web | Firebase JS Web SDK (`firebase`) |
| Auth — Mobile | `@react-native-firebase/auth` + `@react-native-google-signin/google-signin` |
| Database — Web | Firebase JS SDK (`firebase/firestore`) |
| Database — Mobile | `@react-native-firebase/firestore` |
| Navigation | React Navigation v7 (native-stack) |
| State | React Context API |

---

## Project Structure

```
HBIntern/
├── app/                          # Screens (both platforms)
│   ├── _layout.jsx               # Root layout — providers + navigator
│   ├── get-started.jsx           # Landing screen
│   ├── index.jsx                 # Login screen
│   └── dashboard.jsx             # Protected dashboard
├── src/
│   ├── components/
│   │   ├── BrandLogo.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── GoogleLoginButton.jsx
│   ├── config/
│   │   ├── appConfig.js          # ALLOWED_EMAIL_DOMAIN + client IDs
│   │   └── firebase.js           # Firebase JS Web SDK init (web only)
│   ├── constants/colors.js
│   ├── context/AuthContext.jsx   # Auth state — platform-split SDK usage
│   ├── mocks/                    # Web stubs for native-only packages
│   │   ├── codegenNativeComponent.js
│   │   ├── googleSignin.js
│   │   ├── rnFirebaseAuth.js
│   │   └── rnFirebaseFirestore.js
│   ├── services/firestoreService.js  # Firestore — platform-split
│   └── utils/
│       ├── validateDomain.js
│       └── domainValidation.js
├── android/
│   └── app/
│       └── google-services.json  # Required for native Firebase on Android
├── index.js                      # Native entry point
├── index.web.js                  # Web entry point
├── index.html                    # HTML shell for Vite
├── vite.config.mjs               # Web build + native package stubs
├── babel.config.js
├── .env                          # Environment variables (not committed)
└── .env.example                  # Template
```

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 22.11.0
- JDK 17 + Android Studio (for Android)
- A Firebase project with Google Auth enabled

### 1. Clone & Install

```bash
git clone <repo-url>
cd HBIntern
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Fill in your Firebase project values. All keys must have the `VITE_` prefix for the web build.

---

## Firebase Setup (Critical for Mobile)

### Step 1 — Enable Google Sign-In in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/) → your project.
2. **Authentication → Sign-in method** → enable **Google**.
3. **Authentication → Settings → Authorized domains** → add `localhost` and your production domain.

### Step 2 — Get your SHA-1 fingerprint (Android)

Run this in the project root:

```bash
cd android && ./gradlew signingReport
```

Copy the `SHA1` value from the `debug` variant output.

### Step 3 — Add SHA-1 to Firebase Console

1. Firebase Console → Project Settings → Your apps → Android app.
2. Add the SHA-1 fingerprint.
3. Download the updated `google-services.json`.
4. Replace `android/app/google-services.json` with the downloaded file.

> **Without the correct SHA-1 in google-services.json, Google Sign-In will fail on Android with a `DEVELOPER_ERROR`.**

### Step 4 — Firestore Security Rules

In Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.token.email.matches(".*@gmail\\.com$");
    }
  }
}
```

---

## Running the App

### Web

```bash
npm run web
# Opens at http://localhost:5173
```

### Android

```bash
# Terminal 1 — Metro bundler
npm start -- --reset-cache

# Terminal 2 — install + launch on emulator/device
npm run android
```

---

## Authentication Flow

```
User taps "Sign in with Google"
           │
           ├── Web ──► Firebase signInWithPopup (real Google OAuth popup)
           │                      │
           │           Google returns user object with email + uid
           │
           └── Mobile ──► GoogleSignin.signIn() (native account picker)
                                    │
                          Returns idToken from Google
                                    │
                          RNFirebaseAuth().signInWithCredential(idToken)
                                    │
                          Firebase verifies token, returns user

                   email extracted from Firebase user
                                │
               ┌────────────────▼─────────────────┐
               │        Domain Validation          │
               │  email.split('@')[1] === 'gmail.com' │
               └────────────────┬─────────────────┘
                                │
               ┌────────────────┴──────────────────┐
            ✅ PASS                             ❌ FAIL
               │                                   │
     syncUserProfile()                    signOut() (revoke session)
     → Firestore upsert                   Show error:
     → Assign role (Admin / User)         "Access restricted. Please login
     → setUser(profile)                    using your official domain email."
     → Navigate to Dashboard
```

### Domain Restriction — How It Works

After Google sign-in, the email is extracted from the Firebase user object and checked:

```js
// src/utils/validateDomain.js
const parts = email.trim().toLowerCase().split('@');
return parts[1] === 'gmail.com';  // exact domain match
```

`endsWith` is intentionally **not used** — `user@fakegmail.com` ends with `gmail.com` but is not the same domain. The split-and-compare approach is exact.

If the check fails:
1. The Firebase session is immediately revoked (`signOut`)
2. An error is shown: *"Access restricted. Please login using your official domain email."*
3. The user stays on the login screen

---

## Role-Based Access

Roles are assigned during Firestore profile sync:

| Email prefix | Role |
|---|---|
| `admin@...` or `lead@...` | `Admin` |
| Everything else | `User` |

The role is stored in the `users/{email}` Firestore document and displayed as a badge on the Dashboard.

> For production, roles should be managed via [Firebase Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims) using the Admin SDK — client-side role assignment can be spoofed.

---

## Protected Routes

Route protection uses React Navigation's **conditional screen registration**:

```jsx
{isAuthenticated ? (
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
) : (
  <>
    <Stack.Screen name="GetStarted" />
    <Stack.Screen name="Login" />
  </>
)}
```

When `isAuthenticated` is `false`, the Dashboard screen does not exist in the navigator. Typing its URL or navigating directly is impossible — there is no route to land on.

### Session Persistence

- **Web**: Firebase JS SDK persists the session in IndexedDB. `onAuthStateChanged` restores it on page reload — no re-login needed.
- **Mobile**: `@react-native-firebase` persists the session natively. `onAuthStateChanged` restores it on app restart.

The app shows a loading spinner on startup until the session check resolves, so users never see a login-screen flash if they are already authenticated.

---

## Platform Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Shared Code                       │
│  app/screens, src/context, src/utils, src/services  │
│           Platform.OS checks at runtime             │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
      Platform.OS = 'web'    Platform.OS = 'android'|'ios'
               │                      │
   Firebase JS Web SDK      @react-native-firebase
   (signInWithPopup)        (native Google Sign-In picker
   firebase/firestore        + signInWithCredential)
   Vite bundles stubs        @react-native-firebase/firestore
   for native packages       Metro bundles web SDK stubs
```

Web builds use Vite aliases to replace native packages with empty stubs. Mobile builds use Metro's module resolution which finds the real native packages.

---

## Scripts

| Command | Description |
|---|---|
| `npm run web` | Start Vite dev server (http://localhost:5173) |
| `npm start -- --reset-cache` | Start Metro (always reset cache after changes) |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | ESLint |
| `npm test` | Jest |

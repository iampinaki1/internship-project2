# HBIntern - React Native (JavaScript / JSX)

Project bootstrapped with React Native CLI (v0.88), converted to pure JavaScript/JSX, aur physical Android device par successfully test aur run ho chuka hai.

---

## 🎨 UI Colour Scheme

| Colour | HEX Code | Usage |
|---|---|---|
| **Soft Peach** | `#F9E0D9` | Main background |
| **Vibrant Coral** | `#E85D4E` | High-contrast CTA buttons, HB+ logo badge, Signout |
| **Warm Coral (Muted)** | `#F4B5A3` | Secondary accents, borders |
| **Light Peach** | `#F8DFD8` | Secondary backgrounds |
| **Pastel Lavender** | `#DBDBF7` | Activity cards |
| **Pure White** | `#FFFFFF` | Cards and containers |
| **Off White** | `#F9F9F9` | Secondary surfaces |
| **Charcoal** | `#1E1E1E` | Headings and crisp text |
| **Medium Gray** | `#6E6E6E` | Secondary text, icons (enhanced contrast) |
| **Dark Taupe** | `#4A3E3A` | Graph lines |


---

## 🛠️ Kya Issues Aaye The Aur Humne Kaise Solve Kiya (Audit & Fix Summary)

### 1. TypeScript to Pure JSX Migration Issue
- **Problem**: Default React Native CLI ne project ko TypeScript ke saath (`App.tsx` aur `__tests__/App.test.tsx`) create kar diya tha, jabki hume pure **JavaScript / JSX** use karna tha. Jab humne seedhe `.jsx` banaya, toh Jest test fail ho gaya: `SyntaxError: Cannot use import statement outside a module` kyunki React Native ka default Jest preset sirf `.js`, `.ts`, `.tsx` transform karta tha, `.jsx` nahi.
- **Solution**:
  - `App.tsx` ko delete karke clean `App.jsx` banaya.
  - Test file ko `__tests__/App.test.js` me convert kiya.
  - `jest.config.js` me transform rule update kiya taaki `.jsx` ko Babel transform kare:
    ```javascript
    module.exports = {
      preset: '@react-native/jest-preset',
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      },
    };
    ```
  - `npm test` run kiya aur tests 100% pass ho gaye.

---

### 2. Missing Android SDK Build-Tools & CMake (New Architecture)
- **Problem**: React Native 0.88 by default New Architecture (Fabric + TurboModules) use karta hai jisme native C++ code compile hota hai. Iske liye `Android SDK Build-Tools 37.0.0` aur `CMake 3.22.1` required the jo machine par pehle install nahi the.
- **Solution**:
  - `android/local.properties` me SDK path verify kiya:
    ```properties
    sdk.dir=C:/Users/Outpi/AppData/Local/Android/Sdk
    ```
  - `ANDROID_HOME` aur `ANDROID_SDK_ROOT` environment variables verify aur persist kiye.
  - Gradle build ke dauran Android SDK ne required Build-Tools 37 aur CMake 3.22.1 auto-accept license ke saath install kar liye aur native libraries compile kar li.

---

### 3. Port 8081 & Metro Packager Prompt Issue
- **Problem**: Port 8081 pehle se free kiya gaya tha aur uspar Metro bundler process chal raha tha. Lekin jab normal `npx react-native run-android` run karte the, toh wo firse naya packager start karne ki koshish karta tha aur interactive prompt aata tha: *`Another process is running on port 8081. Use port 8082 instead?`*
- **Solution**:
  - Naya port choose karne ya process kill karne ki zaroorat nahi thi.
  - `--no-packager` flag use kiya:
    ```powershell
    npx react-native run-android --no-packager
    ```
  - Isse build ne existing port 8081 wale Metro process ko seamlessly reuse kiya bina kisi conflict ke.

---

### 4. Physical Android Phone Connectivity & Fast Refresh
- **Problem**: Phone USB se connected tha aur authorize ho chuka tha, lekin phone ke andar se app ko `localhost:8081` (Metro bundler) ka connection nahi mil pata.
- **Solution**:
  - Reverse port forwarding command execute ki:
    ```powershell
    adb reverse tcp:8081 tcp:8081
    ```
  - Isse phone ka port 8081 direct PC ke Metro port 8081 se link ho gaya.
  - APK phone par install ho gayi (`BUILD SUCCESSFUL in 6m 2s`).
  - App open hone par bundle download hua (`Running "HBIntern" with {"fabric":true}`).
  - Fast Refresh test kiya aur code change turant phone screen par live reflect hua.

---

## 🚀 How to Run the Project (Daily Workflow)

### 1. Metro Bundler Start Karein:
```powershell
npm start
```

### 2. USB Reverse Set Karein (Physical Device):
```powershell
adb reverse tcp:8081 tcp:8081
```

### 3. App Run Karein (Second Terminal):
```powershell
npx react-native run-android --no-packager
```

### 4. Tests Run Karein:
```powershell
npm test
```

### 5. Web App Run Karein (React Native for Web + Vite):
```powershell
npm run web
```
Browser me `http://localhost:5173` par app open ho jayegi.


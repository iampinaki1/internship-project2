# Authentication Flow Diagrams

## 1. Overall Authentication Flow

```mermaid
flowchart TD
    A([User opens app]) --> B{Platform?}

    B -->|Web| C[GetStarted Screen]
    B -->|Android / iOS| C

    C --> D[Login Screen]
    D --> E[Tap 'Sign in with Google']

    E -->|Web| F[Firebase signInWithPopup\nGoogle OAuth Popup]
    E -->|Mobile| G[GoogleSignin.signIn\nNative Account Picker]

    F --> H{Popup result}
    H -->|Closed / cancelled| I[Error: Popup was closed]
    H -->|Unauthorised domain| J[Error: Add domain to Firebase]
    H -->|Success| K[Extract email + uid from Firebase user]

    G --> L{Sign-in result}
    L -->|Cancelled| M[Error: Sign-in was cancelled]
    L -->|No ID token| N[Error: No ID token returned]
    L -->|Success| O[Exchange idToken for Firebase credential\nsignInWithCredential]
    O --> K

    I --> D
    J --> D
    M --> D
    N --> D

    K --> P{Domain Validation\nemail.split at @\ndomain === 'gmail.com'}

    P -->|FAIL| Q[Revoke Firebase session\nsignOut immediately]
    Q --> R[Show error:\nAccess restricted.\nPlease login using\nyour official domain email.]
    R --> D

    P -->|PASS| S[syncUserProfile\nFirestore upsert]
    S --> T[Assign role:\nAdmin if email starts with admin or lead\nUser otherwise]
    T --> U[setUser in AuthContext\nisAuthenticated = true]
    U --> V[Dashboard Screen]
```

---

## 2. Session Persistence Flow

```mermaid
flowchart TD
    A([App starts]) --> B[AuthContext mounts\ninitializing = true]
    B --> C{Platform?}

    C -->|Web| D[onAuthStateChanged\nFirebase JS SDK\nReads IndexedDB cache]
    C -->|Mobile| E[onAuthStateChanged\n@react-native-firebase\nReads native keychain]

    D --> F{Cached Firebase\nsession found?}
    E --> F

    F -->|No session| G[setUser null\ninitializing = false\nShow Login Screen]
    F -->|Session found| H{Re-validate domain\nof cached email}

    H -->|Domain invalid| I[signOut immediately\nsetUser null\ninitializing = false\nShow Login Screen]
    H -->|Domain valid| J[syncUserProfile\nFirestore upsert]
    J --> K[setUser with profile\ninitializing = false\nShow Dashboard directly\nNo re-login needed]
```

---

## 3. Domain Validation Logic

```mermaid
flowchart TD
    A([email string]) --> B[Trim + lowercase]
    B --> C[Split on '@']
    C --> D{Exactly 2 parts?\nBoth non-empty?}

    D -->|No| E[INVALID\nNot a valid email address]

    D -->|Yes| F[Extract domain part\ne.g. gmail.com]
    F --> G{domain === 'gmail.com'\nExact match}

    G -->|No| H[INVALID\nAccess restricted.\nPlease login using\nyour official domain email.]
    G -->|Yes| I[VALID\nProceed to Firestore sync]

    style E fill:#fde8e8,stroke:#e53e3e
    style H fill:#fde8e8,stroke:#e53e3e
    style I fill:#e8f5e9,stroke:#2e7d32
```

---

## 4. Platform SDK Split

```mermaid
flowchart LR
    subgraph Shared["Shared Code (same file)"]
        AC[AuthContext.jsx]
        FS[firestoreService.js]
    end

    subgraph Web["Web Build — Vite"]
        W1[firebase/auth\nsignInWithPopup\nonAuthStateChanged]
        W2[firebase/firestore\nsetDoc / getDoc]
        W3[Native package stubs\nsrc/mocks/rn*.js\nEmpty objects — never called]
    end

    subgraph Mobile["Mobile Build — Metro"]
        M1[@react-native-firebase/auth\nNative Google credential\nonAuthStateChanged]
        M2[@react-native-firebase/firestore\nNative Firestore SDK]
        M3[@react-native-google-signin\nNative account picker]
    end

    AC -->|Platform.OS === 'web'| W1
    AC -->|Platform.OS === 'web'| W3
    AC -->|Platform.OS !== 'web'| M1
    AC -->|Platform.OS !== 'web'| M3

    FS -->|Platform.OS === 'web'| W2
    FS -->|Platform.OS !== 'web'| M2

    style Web fill:#e3f2fd,stroke:#1565c0
    style Mobile fill:#f3e5f5,stroke:#6a1b9a
    style Shared fill:#fff8e1,stroke:#f57f17
```

---

## 5. Protected Route Guard

```mermaid
flowchart TD
    A([Navigate to any screen]) --> B[RootNavigator reads\nisAuthenticated from AuthContext]

    B --> C{initializing?}
    C -->|true| D[Show Loading Spinner\nWait for session check]
    D --> B

    C -->|false| E{isAuthenticated?}

    E -->|true| F[Navigator only contains\nDashboard screen\nAll other routes do not exist]
    E -->|false| G[Navigator only contains\nGetStarted + Login screens\nDashboard route does not exist]

    F --> H{User tries to access\nLogin URL directly}
    H --> I[Route does not exist\nNavigator ignores it\nUser stays on Dashboard]

    G --> J{User tries to access\nDashboard URL directly}
    J --> K[Route does not exist\nNavigator ignores it\nUser stays on Login]

    style F fill:#e8f5e9,stroke:#2e7d32
    style G fill:#fff3e0,stroke:#e65100
    style I fill:#e8f5e9,stroke:#2e7d32
    style K fill:#fde8e8,stroke:#e53e3e
```

---

## 6. Role-Based Access

```mermaid
flowchart TD
    A([Validated email]) --> B[syncUserProfile called]
    B --> C{Email prefix check}

    C -->|starts with 'admin'\nor starts with 'lead'| D[role = 'Admin']
    C -->|anything else| E[role = 'User']

    D --> F[Store in Firestore\nusers collection\ndoc ID = email]
    E --> F

    F --> G[Return profile to AuthContext]
    G --> H[Dashboard reads user.role]

    H -->|Admin| I[Show gold badge\n⭐ Admin\nGold highlighted role row]
    H -->|User| J[Show grey badge\n👤 User\nNormal role row]

    style D fill:#fff8e1,stroke:#f57f17
    style E fill:#f5f5f5,stroke:#757575
    style I fill:#fff8e1,stroke:#f9a825
    style J fill:#f5f5f5,stroke:#9e9e9e
```

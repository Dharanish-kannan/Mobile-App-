# The Startup Idea Evaluator 🚀 – AI + Voting App

A mobile-first application where entrepreneurs submit startup concepts, receive instant, witty AI-generated feedback ratings (0–100), vote on community submissions, and track standings on a competitive podium leaderboard.

---

## 📱 Problem Statement & Overview

Pitching startup ideas is often met with slow, generic advice or radio silence. **The Startup Idea Evaluator** turns ideation into a fun, gamified social experience:
- **Pitch It**: Submit your startup name, one-line tagline, and value proposition.
- **Get Evaluated**: An AI engine analyzes the pitch and delivers an instant 0–100 score, market tier badge, and a witty commentary.
- **Community Upvotes**: Discover community submissions and vote on your favorites (strictly one vote per idea, saved locally).
- **Leaderboard Podium**: Celebrate top-ranked ideas with an Olympic-style gold, silver, and bronze 3D podium.

---

## 🛠️ Tech Stack Used

- **Framework**: [React Native](https://reactnative.dev/) (v0.88) with [Expo](https://expo.dev/) (SDK 58)
- **Routing & Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) v58 (file-based navigation with custom floating tab bar)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode, zero type errors)
- **State Management & Persistence**: [Zustand](https://github.com/pmndrs/zustand) v5 paired with [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/)
- **Visuals & Animations**:
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) v4
  - [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
  - Custom SVG circular score rings with [react-native-svg](https://github.com/software-mansion/react-native-svg)
- **Typography & Icons**:
  - Google Fonts: Space Grotesk & Inter via `@expo-google-fonts`
  - Vector icons via `lucide-react-native`
- **Native Integrations**:
  - `expo-haptics` for tactile micro-interactions
  - `expo-clipboard` and native `Share` API for frictionless sharing
  - `expo-splash-screen` for smooth cold-boot transitions

---

## 🧱 Features Implemented

### 1. 🧾 Idea Submission Screen
- **Input Fields**:
  - *Startup Name* (with live min/max counter and validation)
  - *One-line Tagline* (focused elevator pitch)
  - *Pitch & Solution Description* (multiline problem/solution breakdown)
- **Fake AI Evaluation Engine**:
  - Deterministic hash-based scoring (0–100) tied to the core idea.
  - Tier classification:
    - 🦄 **Unicorn Tier** (90–99)
    - 🚀 **Series A Contender** (75–89)
    - ⚡ **Promising Spark** (50–74)
    - ⚠️ **Pivot or Perish** (15–49)
  - Dynamic witty commentary tailored to the tier.
- **Simulated Latency & Animated Overlay**:
  - Interactive evaluation modal with step-by-step progress and haptic feedback.
  - Automatically saves the newly generated idea to persistent local storage and redirects to the feed.

### 2. 📜 Idea Listing Screen
- **Idea Card Feed**:
  - Displays name, tagline, score ring, witty verdict, and vote count.
  - **Read More / Show Less**: Smooth layout animation expanding full multiline descriptions without breaking scroll position.
  - **One-Vote Upvoting**: Enforces one vote per idea per user, persisted immediately to `AsyncStorage`.
  - **Sharing & Copying**:
    - One-tap clipboard copy formatted with title, score, and pitch.
    - Native OS Share dialog for messaging apps and social media.
- **Dynamic Sorting**:
  - Instant toggle between **Sort by Votes** and **Sort by Rating** with two-tier deterministic tiebreakers.
- **Pull-to-Refresh**: Native pull-down gesture to refresh and re-sync feed data.

### 3. 🏆 Leaderboard Screen
- **Top 5 Showcase**:
  - Displays top 5 ideas dynamically sorted by votes or rating.
- **Olympic 3D Podium**:
  - Top 3 concepts displayed on real podium pedestals (1st in center and tallest, 2nd on left, 3rd on right).
  - Authentic gold, silver, and bronze vertical gradients with glowing highlights.
  - 🥇, 🥈, 🥉 medal badges and icons.
  - Graceful rendering for 1, 2, or 3+ submissions.
- **Runners-Up List**:
  - Compact rows for 4th and 5th places with rank numbers and score rings.
- **Entrance Animations**: Reanimated staggered entrance on tab focus and filter toggle.

### 4. 🌟 Bonus Features & UX Polish
- **Toast Notifications**: Built-in Toast context provider for upvotes, submission confirmations, and copy actions.
- **Haptic Feedback**: Tactile responses for tab selection, button taps, and error states.
- **Custom Fonts**: Typography hierarchy utilizing Space Grotesk for bold headings and Inter for body text.
- **Responsive Web Container**: Clean, centered mobile shell layout when tested on desktop browsers.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd "Mobile app"
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

- **Web Browser**: Press `w` or run `npx expo start --web`
- **Android Emulator / Device**: Press `a` or scan the QR code with **Expo Go**
- **iOS Simulator / Device**: Press `i` or scan the QR code with **Expo Go**
- **Tunnel Mode (Network fallback)**:
  ```bash
  npx expo start --tunnel
  ```

### 3. Verification & Quality Checks
```bash
# Run TypeScript Typecheck (0 errors)
npx tsc --noEmit

# Run Linter (0 warnings, 0 errors)
npx expo lint
```

---

## 📦 How to Build or Install the Android APK

This project is configured with Expo Application Services (EAS) in `eas.json`.

### Build Android APK via EAS:
```bash
# Install EAS CLI globally if not already installed
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build a standalone Android APK (preview profile)
eas build --profile preview --platform android
```
Once the cloud build finishes, EAS will provide a direct download link for the installable `.apk` file.

### Installing the APK on Android:
1. Download the `.apk` file to your Android phone (or send via Google Drive / USB).
2. Tap the file in your notification center or Files app.
3. Allow "Install unknown apps" if prompted by Android.
4. Open **Startup Idea Evaluator** and enjoy!

# Multi-Feature Web App Scaffold

This repository is a scaffold for a Next.js web application with multiple independent features and a global settings page. The project is structured to allow different team members to work on separate features in isolation, with a shared layout and global styles.

## Features

- **Deadlines Lookup:** Find relevant deadlines by ZIP code (e.g., voter registration deadlines).
- **Translation Assistant:** Translate text into different languages.
- **SMS Simulator:** A simple interface to simulate sending and receiving SMS messages.
- **News Claim Fact Check:** Verify the authenticity of news or claims using the Google Fact Check API (with a fallback to news search via GNews).
- **Settings:** Toggle dark mode and adjust text size preferences (affecting the entire app via CSS variables).

Each feature's frontend code lives in its own folder under `/features`, and each has a corresponding page in `/pages` for routing.

## Project Structure

```plaintext
features/        -> Feature-specific React components (UI for each feature)  
server/          -> Placeholder backend logic for each feature (to be implemented)  
pages/           -> Next.js pages that route to feature components and other pages  
components/      -> Shared components (Layout, Nav, ThemeToggle)  
styles/          -> Global CSS and CSS variable definitions (themes, tokens)  
data/            -> Local JSON data for placeholders or fallback (optional)  
lib/             -> Utility functions (e.g., fetchJson for API calls)  
.env.example     -> Example environment variables for API keys  
docs/            -> Documentation (API specs, etc.)  
```

No database is used in this scaffold. Any data is either hardcoded in the data/ JSON files or will be fetched via external APIs. The backend files under server/ are currently empty and serve as placeholders for future implementation (they could be implemented as serverless functions or separate services as needed).

Global theming (dark mode and text size) is handled via CSS variables defined in styles/tokens.css. The ThemeToggle component (used in the Settings page) updates these variables by toggling attributes on the <html> element, allowing for instant theme changes across the app. The app's layout and navigation are defined in the components/Layout.tsx and components/Nav.tsx files, ensuring a consistent look and feel.

## Setup & Usage

### Install Dependencies:
Run `npm install` (or yarn) to install the required packages.

### Environment Variables:
Copy `.env.example` to `.env` in the project root, and fill in the necessary API keys:

- `GOOGLE_FACTCHECK_API_KEY` - API key for Google Fact Check API (for the fact-check feature).
- `GNEWS_API_KEY` - API key for GNews API (used as a fallback for news search).
- `TRANSLATOR_ENGINE` - Identifier or API key for the translation service (if needed, e.g., "google" or "deepl").

### Running the Development Server:
Use `npm run dev` to start the Next.js development server.
Open http://localhost:3000 to view the app. You should see the homepage with links to all features. Each feature page has a basic UI and dummy functionality as described.

### Deployment:
This project can be deployed to Vercel (or any platform that supports Next.js). Ensure that you add the environment variables in your deployment environment (e.g., in Vercel's dashboard) for the API keys. Since the backend logic is not implemented yet, the app will function in a read-only or demo capacity until those are added.

## Contributing Guidelines

To avoid Git merge conflicts and ensure a smooth development process:

1. **One Feature per Developer:** Each team member should focus on one feature. Limit changes to your feature's folder in `/features` and its corresponding page in `/pages`.

2. **Coordinate Shared Changes:** Shared files (like those in `/components` or global styles in `/styles`) should be edited by the team lead or with clear communication among team members. If you need a change in a shared file, coordinate first to avoid overlapping edits.

3. **Use Feature Branches:** Develop each feature in its own Git branch (e.g., `feature/deadlines-ui`, `feature/translation-ui`). Merge into the main branch only when the feature is stable to prevent conflicts.

4. **Consistent Code Style:** Follow the established coding style in this scaffold (e.g., functional React components, hook usage for state, etc.). This will make it easier to integrate each feature smoothly.

5. **Placeholder Backends:** If you need to simulate backend behavior for testing, you can use the JSON files in `/data` or create simple stub functions. Avoid adding actual backend logic in this repository; that will be handled in the future or in a separate backend service.

## 📋 Developer Assignments & Instructions

### **Developer 1 - Deadlines Feature**
**Files to work on:**
- `features/deadlines/DeadlinesPage.tsx` - Frontend component
- `pages/deadlines.tsx` - Page route
- `pages/api/deadlines.ts` - API endpoint (implement Google Civic API)
- `server/deadlines/index.ts` - Backend logic

**What to implement:**
1. **Google Civic Information API integration** - Get election deadlines by ZIP code
2. **ZIP code validation** - Ensure valid US ZIP codes
3. **Error handling** - Handle API failures gracefully
4. **UI improvements** - Better deadline display format

**API Key needed:** `GOOGLE_CIVIC_INFORMATION_API_KEY`

---

### **Developer 2 - Translation Feature**
**Files to work on:**
- `features/translation/TranslationPage.tsx` - Frontend component
- `pages/translate.tsx` - Page route
- `pages/api/translation.ts` - ✅ **COMPLETED** - API endpoint
- `server/translation/main.py` - ✅ **COMPLETED** - Python backend

**What to do:**
1. **Test the translation flow** - Frontend ↔ API ↔ Python backend
2. **Add more languages** - Expand the language dropdown
3. **Improve UI/UX** - Better translation display
4. **Run Python backend:** `python server/translation/main.py` (port 8000)

**No API key needed** - Uses free Google Translate via deep-translator

---

### **Developer 3 - SMS Feature**
**Files to work on:**
- `features/sms/SMSPage.tsx` - Frontend component
- `pages/sms.tsx` - Page route
- `pages/api/sms.ts` - API endpoint (implement SMS simulation)
- `server/sms/index.ts` - Backend logic

**What to implement:**
1. **SMS simulation logic** - Simulate sending/receiving messages
2. **Conversation history** - Store and display message threads
3. **Automated responses** - Generate realistic bot replies
4. **UI improvements** - Better chat interface design

**No external API needed** - Pure simulation

---

### **Developer 4 - Fact Check Feature**
**Files to work on:**
- `features/factcheck/FactCheckPage.tsx` - Frontend component
- `pages/factcheck.tsx` - Page route
- `pages/api/factcheck.ts` - API endpoint (implement fact-checking)
- `server/factcheck/index.ts` - Backend logic

**What to implement:**
1. **Google Fact Check Tools API** - Primary fact-checking service
2. **GNews API fallback** - When no fact-check found, show related news
3. **Result formatting** - Display fact-check ratings and sources
4. **Error handling** - Handle API failures and rate limits

**API Keys needed:** `GOOGLE_FACTCHECK_API_KEY`, `GNEWS_API_KEY`

**Implementation flow:**
1. Try Google Fact Check API first
2. If no results, fallback to GNews API
3. Return fact-check results OR related news articles

---

### **Developer 5 - Main App & Settings (Team Lead)**
**Files to work on:**
- `pages/index.tsx` - Homepage
- `pages/settings.tsx` - Settings page
- `pages/_app.tsx` - Main app component
- `components/Layout.tsx` - Layout component
- `components/Nav.tsx` - Navigation component
- `components/ThemeToggle.tsx` - Theme toggle

**What to manage:**
1. **Shared components** - Layout, Nav, ThemeToggle
2. **Global theming** - Dark mode, text size, CSS variables
3. **Navigation** - Links between all features
4. **Coordination** - Help other developers with shared changes

**No backend needed** - Frontend only

---

## 🚀 Getting Started

### **1. Environment Setup**
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your API keys in .env file
```

### **2. Create Feature Branch**
```bash
git checkout -b feature/developer-1-deadlines
git checkout -b feature/developer-2-translation
git checkout -b feature/developer-3-sms
git checkout -b feature/developer-4-factcheck
git checkout -b feature/developer-5-main-app
```

### **3. Start Development**
```bash
# Start Next.js dev server
npm run dev

# For Developer 2 (Translation), also start Python backend
python server/translation/main.py
```

### **4. Test Your Feature**
- **Developer 1:** http://localhost:3000/deadlines
- **Developer 2:** http://localhost:3000/translate
- **Developer 3:** http://localhost:3000/sms
- **Developer 4:** http://localhost:3000/factcheck
- **Developer 5:** http://localhost:3000/

### ⚠️ Zero Merge Conflicts Guaranteed!
Each developer has completely separate files with no overlapping ownership.

Happy coding! This scaffold should give you a running start. Each feature page is operational in a placeholder capacity, and the overall app is set up to be expanded with real functionality. If you have any questions or need to adjust the shared components or styles, discuss with the team to coordinate those changes.

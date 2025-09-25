# Developer File Ownership

This document clearly defines which files each developer can work on to prevent merge conflicts and ensure smooth parallel development.

## Developer 1 - Deadlines Feature
**Focus:** ZIP code lookup functionality, deadline display, Google Civic Information API integration

### Files You Own:
- `features/deadlines/DeadlinesPage.tsx` - Main deadlines component
- `pages/deadlines.tsx` - Deadlines page route
- `pages/api/deadlines.ts` - **CREATE THIS** - API endpoint for deadlines
- `server/deadlines/index.ts` - **IMPLEMENT THIS** - Backend logic for Google Civic API

### API Integration:
- **Google Civic Information API** - Get election deadlines by ZIP code
- **Environment Variable:** `GOOGLE_CIVIC_INFORMATION_API_KEY`
- **Endpoint:** `GET /api/deadlines?zip=<ZIPCODE>`

### What You Need to Implement:
1. Create `pages/api/deadlines.ts` for Next.js API route
2. Implement Google Civic Information API integration in `server/deadlines/index.ts`
3. Handle ZIP code validation and error cases
4. Format election deadlines for display

---

## Developer 2 - Translation Feature
**Focus:** Text translation functionality, language selection, deep-translator integration

### Files You Own:
- `features/translation/TranslationPage.tsx` - Main translation component
- `pages/translate.tsx` - Translation page route
- `pages/api/translation.ts` - **COMPLETED** - API endpoint for translation
- `server/translation/main.py` - **COMPLETED** - Python Flask backend with deep-translator

### API Integration:
- **Deep Translator Library** - Python library for Google Translate
- **Environment Variables:** `TRANSLATION_SERVICE_URL`, `DEEP_TRANSLATOR_ENGINE`
- **Endpoint:** `GET /api/translation?text=<TEXT>&lang=<LANG_CODE>`

### What's Already Done:
✅ Flask backend with deep-translator integration  
✅ Next.js API route for translation  
✅ Python dependencies in requirements.txt  
✅ Environment variables configured  

### What You Need to Do:
1. **Run the Python backend:** `python server/translation/main.py` (port 8000)
2. **Test the integration** between frontend and backend
3. **Add more language options** to the frontend dropdown if needed

---

## Developer 3 - SMS Feature
**Focus:** SMS simulation, chat interface, message handling

### Files You Own:
- `features/sms/SMSPage.tsx` - Main SMS component
- `pages/sms.tsx` - SMS page route
- `pages/api/sms.ts` - **CREATE THIS** - API endpoint for SMS simulation
- `server/sms/index.ts` - **IMPLEMENT THIS** - Backend logic for SMS simulation

### API Integration:
- **No External API** - Simulated SMS service
- **Functionality:** Message storage, automated responses, conversation history
- **Endpoint:** `POST /api/sms`

### What You Need to Implement:
1. Create `pages/api/sms.ts` for Next.js API route
2. Implement SMS simulation logic in `server/sms/index.ts`
3. Handle message storage and automated responses
4. Create conversation history functionality

---

## Developer 4 - Fact Check Feature
**Focus:** Fact-checking functionality, news verification, Google Fact Check API integration

### Files You Own:
- `features/factcheck/FactCheckPage.tsx` - Main fact-check component
- `pages/factcheck.tsx` - Fact-check page route
- `pages/api/factcheck.ts` - **CREATE THIS** - API endpoint for fact-checking
- `server/factcheck/index.ts` - **IMPLEMENT THIS** - Backend logic for Google Fact Check API

### API Integration:
- **Google Fact Check Tools API** - Primary fact-checking service
- **GNews API** - Fallback for related news articles
- **Environment Variables:** `GOOGLE_FACTCHECK_API_KEY`, `GNEWS_API_KEY`
- **Endpoint:** `GET /api/factcheck?query=<QUERY_TEXT>`

### What You Need to Implement:
1. Create `pages/api/factcheck.ts` for Next.js API route
2. Implement Google Fact Check API integration in `server/factcheck/index.ts`
3. Add GNews API fallback when no fact-check results found
4. Handle different response formats (fact-check vs news articles)

---

## Developer 5 - Main App & Settings (Team Lead)
**Focus:** Shared components, global theming, navigation, main app structure

### Files You Own:
- `pages/index.tsx` - Homepage
- `pages/settings.tsx` - Settings page
- `pages/_app.tsx` - Main app component
- `components/Layout.tsx` - Main layout component
- `components/Nav.tsx` - Navigation component
- `components/ThemeToggle.tsx` - Theme toggle component

### What You Manage:
1. **Shared Components** - Layout, Nav, ThemeToggle
2. **Global Theming** - CSS variables, dark mode, text size
3. **Navigation** - Links between all features
4. **App Structure** - Main app setup and routing
5. **Coordination** - Help other developers with shared component changes

### What You Need to Do:
1. **Coordinate shared changes** - If any developer needs changes to shared components
2. **Maintain global styles** - Update `styles/tokens.css` if needed
3. **Help with integration** - Ensure all features work together smoothly

---

## Shared Files (Developer 5 Only)

### ⚠️ DO NOT EDIT THESE FILES (Other Developers):
- `components/Layout.tsx` - Only Developer 5
- `components/Nav.tsx` - Only Developer 5  
- `components/ThemeToggle.tsx` - Only Developer 5
- `pages/_app.tsx` - Only Developer 5
- `styles/tokens.css` - Only Developer 5
- `styles/global.css` - Only Developer 5

### If You Need Changes to Shared Files:
1. **Contact Developer 5** to coordinate changes
2. **Describe what you need** and why
3. **Wait for Developer 5** to make the changes
4. **Test your feature** with the updated shared components

---

## Environment Variables

### All Developers Need:
```env
# Copy .env.example to .env and fill in your API keys
GOOGLE_CIVIC_INFORMATION_API_KEY=your_key_here
GOOGLE_FACTCHECK_API_KEY=your_key_here  
GNEWS_API_KEY=your_key_here
TRANSLATION_SERVICE_URL=http://localhost:8000
DEEP_TRANSLATOR_ENGINE=google
```

### Getting API Keys:
- **Google Civic Information API:** [Google Cloud Console](https://console.cloud.google.com/)
- **Google Fact Check API:** [Google Fact Check Tools](https://developers.google.com/fact-check/tools/api)
- **GNews API:** [GNews API](https://gnews.io/)

---

## Development Workflow

### 1. Create Your Feature Branch:
```bash
git checkout -b feature/developer-1-deadlines
git checkout -b feature/developer-2-translation  
git checkout -b feature/developer-3-sms
git checkout -b feature/developer-4-factcheck
git checkout -b feature/developer-5-main-app
```

### 2. Work Only on Your Files:
- **Developer 1:** Only edit files in your "Files You Own" list
- **Developer 2:** Only edit files in your "Files You Own" list
- **Developer 3:** Only edit files in your "Files You Own" list
- **Developer 4:** Only edit files in your "Files You Own" list
- **Developer 5:** Only edit files in your "Files You Own" list

### 3. Coordinate Shared Changes:
- If you need changes to shared components, contact Developer 5
- Developer 5 will make the changes and notify you
- Test your feature with the updated shared components

### 4. Merge When Ready:
- Each developer merges their feature branch when complete
- No merge conflicts expected due to file ownership
- Developer 5 coordinates final integration

---

## Zero Merge Conflicts Guaranteed! 🎉

This file ownership structure ensures:
- ✅ **Complete File Isolation** - No overlapping ownership
- ✅ **Clear Boundaries** - Each developer knows exactly what they can edit
- ✅ **Shared Component Management** - Only Developer 5 handles shared files
- ✅ **Parallel Development** - All developers can work simultaneously
- ✅ **Easy Coordination** - Clear process for shared component changes

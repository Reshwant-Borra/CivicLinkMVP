# API Endpoints

This document outlines the expected request and response formats for the app's API endpoints. *(Note: These APIs are not yet implemented; this spec is for reference.)*

## Deadlines API

- **Endpoint:** `GET /api/deadlines?zip=<ZIPCODE>`  
- **Description:** Returns deadlines or events associated with the provided ZIP code.
- **Backend:** Uses Google Civic Information API
- **API Key:** Requires `GOOGLE_CIVIC_INFORMATION_API_KEY` environment variable

**Sample Response:**
```json
{
  "zip": "33543",
  "deadlines": [
    { "event": "Voter Registration Deadline", "date": "2025-10-01" },
    { "event": "Election Day", "date": "2025-11-05" }
  ]
}
```

## Translation API

- **Endpoint:** `GET /api/translation?text=<TEXT>&lang=<LANG_CODE>`
- **Description:** Translates the input text into the target language specified by lang (e.g., es for Spanish).
- **Backend:** Uses deep-translator Python library with Google Translate
- **Service:** Requires Python Flask service running on port 8000

**Sample Response:**
```json
{
  "originalText": "Hello",
  "translatedText": "Hola",
  "targetLanguage": "es"
}
```

**Backend Service Endpoints:**
- `POST /translate` - Main translation endpoint (called by Next.js API)
- `GET /health` - Health check endpoint

## SMS API

- **Endpoint:** `POST /api/sms`
- **Description:** Sends an SMS message and returns a simulated response. The request body should include the message content (and potentially a recipient identifier or session ID in a real scenario).

**Sample Request Body:**
```json
{ "message": "Hi there!" }
```

**Sample Response:**
```json
{
  "messages": [
    { "from": "user", "text": "Hi there!" },
    { "from": "bot", "text": "This is an automated reply (placeholder)." }
  ]
}
```

## Fact Check API

- **Endpoint:** `GET /api/factcheck?query=<QUERY_TEXT>`
- (Alternatively, a POST request with JSON body containing the query.)
- **Description:** Checks the given query text against fact-check databases or news sources. If a fact-check is found, returns the verdict and details; if not, returns related news articles as a fallback.

**Sample Response (Fact-Check Found):**
```json
{
  "query": "COVID-19 vaccines cause magnetism",
  "factCheck": {
    "claim": "COVID-19 vaccines cause magnetism",
    "rating": "False",
    "checkedBy": "Reuters"
  }
}
```

**Sample Response (Fallback to News):**
```json
{
  "query": "New species of bird discovered in NYC",
  "articles": [
    {
      "title": "New species of bird discovered in New York City",
      "source": "Example News",
      "published": "2025-09-20"
    }
  ]
}
```

The above API specifications describe how the frontend will interact with the backend once implemented. The frontend pages already use these endpoints (e.g., calling `/api/factcheck?query=...`), expecting data in the shown formats. Developers implementing the backend can follow this guide.

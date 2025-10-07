# Testing Calendly Endpoints

## 1. Make sure server is running

```bash
npm run server:dev
```

You should see:
```
🚀 Server running on http://localhost:3001
📅 Calendly webhook endpoint: http://localhost:3001/api/webhooks/calendly
```

## 2. Test the endpoint

### Without API key (will fail with 401):
```bash
curl http://localhost:3001/api/auth/calendly
```

Expected: `{"error":"Invalid or missing API key"}`

### With API key in header:
```bash
curl -H "x-api-key: YOUR_API_KEY" http://localhost:3001/api/auth/calendly
```

Expected: Redirects to Calendly OAuth page

### With API key in URL (for browser):
```
http://localhost:3001/api/auth/calendly?api_key=YOUR_API_KEY
```

Expected: Redirects to Calendly OAuth page

## 3. Check your .env file

Make sure you have:
```env
CALENDLY_API_KEY=your-api-key-here
CALENDLY_CLIENT_ID=your-client-id
CALENDLY_CLIENT_SECRET=your-client-secret
```

## 4. Test health endpoint (no auth required)

```bash
curl http://localhost:3001/health
```

Expected: `{"status":"OK","timestamp":"..."}`

## Common Issues:

### 404 Not Found
- ✅ Server is not running → Run `npm run server:dev`
- ✅ Wrong URL → Use `/api/auth/calendly` not `/auth/calendly`
- ✅ Port mismatch → Check it's running on 3001

### 401 Unauthorized
- ✅ Missing API key → Add `x-api-key` header or `?api_key=` query param
- ✅ Wrong API key → Check your .env file

### 500 Internal Server Error
- ✅ Missing env vars → Check CALENDLY_CLIENT_ID and CALENDLY_CLIENT_SECRET
- ✅ TypeScript errors → Run `npm run check` to see errors


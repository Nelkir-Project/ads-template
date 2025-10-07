# How to Start the Server Correctly

## Problem: Server not loading .env file

The server was started BEFORE the .env file had the Calendly variables, so it cached empty values.

## Solution:

### 1. Stop ALL Node processes
```powershell
Get-Process -Name node | Stop-Process -Force
```

### 2. Verify .env has the variables
```powershell
Get-Content .env | Select-String "CALENDLY"
```

Should show:
```
CALENDLY_CLIENT_ID=8qodLxg1fHPmy0rMFgJfAxKnvn7geexYdaG3ScSOWgw
CALENDLY_CLIENT_SECRET=hOWo65-bMF28otLkvwMPainBq0xW2fubfxq4DETZJBA
...
```

### 3. Start the server FRESH
```bash
npm run server:dev
```

### 4. Look for this in the output:
```
[dotenv@17.2.1] injecting env (28) from .env
🚀 Server running on http://localhost:3001
```

### 5. Test again:
```
http://localhost:3001/api/auth/calendly?api_key=your-secure-random-api-key
```

### 6. Check the server logs - should now show:
```
=== Calendly OAuth Debug ===
CALENDLY_CLIENT_ID: SET ✓
CALENDLY_CLIENT_SECRET: SET ✓
REDIRECT_URI: http://localhost:3001/api/auth/calendly/callback
============================
```

---

## If it STILL doesn't work:

The module might be caching the imports. Try this:

1. Delete node_modules/.cache if it exists
2. Run: `npm run server:dev`

Or just restart your terminal/IDE completely and try again.


# Debug Steps - Calendly OAuth Not Working

## What We've Confirmed:
✅ `.env` file exists and has correct values
✅ `CALENDLY_CLIENT_ID` = `8qodLxg1fHPmy0rMFgJfAxKnvn7geexYdaG3ScSOWgw`
✅ `CALENDLY_CLIENT_SECRET` = exists
✅ `dotenv` loads variables correctly when tested standalone

## What to Check:

### 1. Is the server actually running?
```powershell
# Check if port 3001 is in use
netstat -ano | Select-String ":3001"

# Should show LISTENING on port 3001
```

### 2. Start the server with full output
```bash
npm run server:dev
```

Look for:
- ` Server running on http://localhost:3001`
- Any TypeScript errors
- Any dotenv loading messages

### 3. Test the endpoint with debug logs
```powershell
# With the server running, make the request:
Invoke-WebRequest -Uri "http://localhost:3001/api/auth/calendly?api_key=your-secure-random-api-key" -UseBasicParsing
```

### 4. Check server console output
You should see in the server terminal:
```
=== Calendly OAuth Debug ===
CALENDLY_CLIENT_ID: SET ✓
CALENDLY_CLIENT_SECRET: SET ✓
REDIRECT_URI: http://localhost:3001/api/auth/calendly/callback
============================
```

### 5. Common Issues:

**Issue A: Server not restarted after adding .env variables**
- Solution: Stop server (Ctrl+C) and run `npm run server:dev` again

**Issue B: TypeScript compilation errors**
- Solution: Run `npm run check` to see errors
- Or check the terminal where server is running for errors

**Issue C: Server running in wrong directory**
- Solution: Make sure you're running from project root, not /server

**Issue D: Port 3001 already in use**
- Solution: Kill the process or use a different port

### 6. Manual Test with Correct API Key

First, generate a real API key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update `.env` with the output:
```env
CALENDLY_API_KEY=<generated-key-here>
```

Then test:
```
http://localhost:3001/api/auth/calendly?api_key=<generated-key-here>
```

### 7. Check if route is registered

In your server terminal when it starts, you should see the routes being registered. If not, there might be an import/export issue.

### 8. Try without API key to see different error

```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/auth/calendly" -UseBasicParsing
```

Should return: `{"error":"Invalid or missing API key"}`

If you get a 404, the route isn't registered correctly.
If you get the API key error, the route IS working but OAuth config is the issue.

---

## Next Step:
Please share:
1. What you see in the server console when you start it
2. What error you get when you visit the URL
3. Output of: `netstat -ano | Select-String ":3001"`


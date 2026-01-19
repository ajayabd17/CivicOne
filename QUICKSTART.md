# Quick Start & Testing Guide

## First Time Setup

### 1. Backend Setup
```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux

# Install dependencies
pip install -r ../requirements.txt

# Verify environment variables exist in root .env
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Verify .env.local exists with backend URL
```

## Running the Application

### Option 1: Automated (Windows)
```bash
# From project root
./start-dev.bat
```

### Option 2: Manual (Two terminals)

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Testing the Integration

### 1. Check Backend is Running
Open: http://localhost:8000/docs
- You should see FastAPI Swagger documentation
- Try the `/resolve` endpoint

### 2. Check Frontend is Running  
Open: http://localhost:9002
- You should see the CivicOne landing page

### 3. End-to-End Test

**Test Case 1: Valid State**
1. Enter: "Street light not working"
2. System should ask for state (or detect if mentioned)
3. Select: "Tamil Nadu"
4. Submit
5. Expected: Portal card with real data from your database

**Test Case 2: Missing State**
1. Enter: "Water leak issue"
2. Don't mention location
3. Submit
4. Expected: State selector appears

### 4. Check Browser Console
- Open DevTools (F12)
- Check Console for errors
- Check Network tab for:
  - POST to `/api/resolve` (should be 200)
  - Request payload includes `state` and `issue_text`
  - Response includes `portal_id`, `portal_name`, etc.

### 5. Check Backend Logs
Watch the backend terminal for:
- Incoming requests
- Database queries
- AI agent responses
- Any errors

## Expected Flow

```
User Input
    ↓
Frontend Form (ComplaintForm.tsx)
    ↓
Next.js API Route (/api/resolve)
    ↓
FastAPI Backend (/resolve)
    ↓
Database Query (get portals by state)
    ↓
AI Agent (select best portal)
    ↓
Database Query (get portal details)
    ↓
Response to Frontend
    ↓
Display Result (ResultCard.tsx)
```

## Common Issues & Fixes

### Backend won't start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Install missing dependency
pip install uvicorn
```

### Frontend won't start
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

### CORS errors in browser
- Verify backend has CORS middleware (app/main.py)
- Check frontend URL matches CORS config
- Restart backend after changes

### "Failed to connect to backend"
- Verify backend is running: http://localhost:8000/docs
- Check .env.local has correct URL
- Check firewall/antivirus

### Database connection errors
- Verify DATABASE_URL in root .env
- Test connection to Supabase
- Check if database has portals table populated

### AI agent errors
- Verify OPENAI_API_KEY in root .env
- Check OpenRouter account has credits
- Look for JSON parsing errors in backend logs

## Success Indicators

✅ Backend running on port 8000  
✅ Frontend running on port 9002  
✅ No CORS errors in browser console  
✅ API request returns 200 status  
✅ Portal card displays with real data  
✅ Redirect to official portal works  

## Next Steps After Testing

1. Populate your portals database with real government portals
2. Test with various states and issue types
3. Verify AI agent selection quality
4. Test edge cases (invalid states, API errors)
5. Deploy to production when ready

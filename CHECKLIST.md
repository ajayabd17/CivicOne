# 🚀 CivicOne Integration Checklist

## ✅ Completed Integration Steps

### Backend Configuration
- [x] Added CORS middleware to FastAPI app
- [x] Configured allowed origins (localhost:9002, localhost:3000)
- [x] /resolve endpoint accepts state + issue_text
- [x] AI agent integrated for portal selection
- [x] Database queries for portals by state
- [x] Error handling for missing/invalid states
- [x] Added pydantic-ai to requirements.txt

### Frontend Configuration
- [x] Created .env.local with backend URL
- [x] Updated API route to proxy to FastAPI backend
- [x] Created lib/states.ts with Indian states list
- [x] Created lib/location.ts with state detection
- [x] Fixed tsconfig.json paths configuration
- [x] ComplaintForm handles state selection
- [x] ResultCard displays portal information
- [x] Error handling for API failures

### Developer Experience
- [x] Created start-dev.bat for Windows
- [x] Created start-dev.sh for Unix/Mac
- [x] Created README.md with full documentation
- [x] Created QUICKSTART.md with testing guide
- [x] Created INTEGRATION.md with architecture details
- [x] Created this checklist

## 🔧 Before First Run

### 1. Install Backend Dependencies
```bash
cd backend
pip install -r ../requirements.txt
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Verify Environment Files

**Root .env:**
- [ ] DATABASE_URL is set
- [ ] OPENAI_API_KEY is set
- [ ] OPENAI_BASE_URL is set

**Frontend .env.local:**
- [ ] NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

### 4. Database Setup
- [ ] Database is accessible
- [ ] Portals table exists
- [ ] At least one portal is populated for testing

## 🧪 Testing Checklist

### Backend Tests
- [ ] Start backend: `cd backend && uvicorn app.main:app --reload --port 8000`
- [ ] Visit http://localhost:8000/docs
- [ ] Test /resolve endpoint via Swagger UI
- [ ] Verify database connection works
- [ ] Check logs for errors

### Frontend Tests
- [ ] Start frontend: `cd frontend && npm run dev`
- [ ] Visit http://localhost:9002
- [ ] Form loads correctly
- [ ] Enter issue text
- [ ] State selector appears if needed
- [ ] Submit works without errors

### Integration Tests
- [ ] Frontend → Backend connection works
- [ ] CORS allows requests (no browser console errors)
- [ ] API returns portal data
- [ ] ResultCard displays portal information
- [ ] Redirect to official portal works

### Test Cases

**Test 1: State in Issue Text**
1. Enter: "Street light not working in Chennai"
2. Expected: Detects "Tamil Nadu"
3. Expected: Shows portal for Tamil Nadu

**Test 2: No State in Issue**
1. Enter: "Water leak in my street"
2. Expected: State selector appears
3. Select: "Karnataka"
4. Expected: Shows portal for Karnataka

**Test 3: Error Handling**
1. Test with state that has no portals
2. Expected: Error message displayed
3. Backend offline scenario
4. Expected: Connection error displayed

## 🐛 Common Issues & Solutions

### Backend Won't Start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Reinstall dependencies
cd backend
pip install -r ../requirements.txt --force-reinstall
```

### Frontend Won't Start
```bash
# Clear cache and reinstall
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### CORS Errors
- Verify backend CORS config includes frontend URL
- Restart backend after changing main.py
- Check browser console for exact error

### Database Connection Errors
- Verify DATABASE_URL format
- Test connection to Supabase
- Check firewall/network

### AI Agent Errors
- Verify OPENAI_API_KEY is valid
- Check OpenRouter account credits
- Look for JSON parsing errors in backend logs

## 📊 Success Criteria

All these should work:
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] No CORS errors in browser console
- [ ] Form submission triggers API call
- [ ] API returns 200 status
- [ ] Portal card displays correctly
- [ ] Official portal link works
- [ ] Error states display properly

## 🎯 Next Steps

After everything works:
1. [ ] Populate database with real government portals
2. [ ] Test with multiple states and issue types
3. [ ] Validate AI agent selection quality
4. [ ] Add more error scenarios
5. [ ] Consider adding analytics
6. [ ] Plan production deployment

## 📝 Notes

- Backend runs on port 8000
- Frontend runs on port 9002
- API route proxies to backend (no direct calls from browser)
- Environment variables are not committed to Git
- .env.local is gitignored

## 🚨 Troubleshooting

If stuck, check:
1. Both services running?
2. Environment variables set?
3. Dependencies installed?
4. Database accessible?
5. Browser console for errors?
6. Backend terminal for errors?
7. Network tab in DevTools?

Still stuck? Check the documentation:
- README.md - Overview
- QUICKSTART.md - Testing guide
- INTEGRATION.md - Architecture
- http://localhost:8000/docs - API docs

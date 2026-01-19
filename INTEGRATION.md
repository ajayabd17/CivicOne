# CivicOne - Full-Stack Integration Guide

## Architecture Overview

### Backend (FastAPI)
- **Port**: 8000
- **Framework**: FastAPI + SQLModel
- **Database**: PostgreSQL (Supabase)
- **AI Agent**: OpenAI via OpenRouter

### Frontend (Next.js)
- **Port**: 9002  
- **Framework**: Next.js 15 (App Router)
- **UI**: Tailwind CSS + Radix UI (shadcn/ui)

## Starting the Application

### Windows
```bash
# Run the startup script
./start-dev.bat
```

### Manual Start

**Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Connection Flow

1. **User Input** → Frontend form (`ComplaintForm.tsx`)
2. **Frontend API Route** → `/api/resolve/route.ts`
3. **Backend Endpoint** → `POST /resolve`
4. **AI Agent** → Selects portal from database
5. **Database Query** → Fetches portal details
6. **Response** → Returns to frontend
7. **Display** → Shows portal card (`ResultCard.tsx`)

## API Contract

### Request (Frontend → Backend)
```json
POST /resolve
{
  "state": "Tamil Nadu",
  "issue_text": "Street light not working in Chennai"
}
```

### Response (Backend → Frontend)
```json
{
  "portal_id": 123,
  "portal_name": "Chennai Municipal Corporation",
  "portal_url": "https://chennaicorporation.gov.in",
  "instructions": "Follow the instructions on the official portal...",
  "reasoning": "This portal is designated for civic issues..."
}
```

## Environment Variables

### Backend (`.env` in root)
```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-or-v1-...
OPENAI_BASE_URL=https://openrouter.ai/api/v1
```

### Frontend (`.env.local` in frontend/)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Key Files

### Backend
- `app/main.py` - FastAPI app with CORS
- `app/routes/resolve.py` - Main resolution endpoint
- `app/agents/civic_agent.py` - AI agent
- `app/services/portal_service.py` - Database queries

### Frontend
- `src/app/api/resolve/route.ts` - Proxy to backend
- `src/components/ComplaintForm.tsx` - Input form
- `src/app/resolve/page.tsx` - Results page
- `src/components/ResultCard.tsx` - Portal display

## Testing the Connection

1. Start both services
2. Open http://localhost:9002
3. Enter an issue and select a state
4. Submit the form
5. Verify the portal result appears

## Troubleshooting

### CORS Errors
- Check backend CORS configuration in `app/main.py`
- Verify frontend URL in `allow_origins`

### Connection Refused
- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`

### Database Errors
- Verify `DATABASE_URL` in root `.env`
- Check Supabase connection

### AI Agent Errors
- Verify `OPENAI_API_KEY` in root `.env`
- Check OpenRouter API status

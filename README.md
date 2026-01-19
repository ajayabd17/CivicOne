# CivicOne - Civic Portal Router for India

A jurisdiction-aware civic access platform that helps Indian citizens find the correct government portal for their issues.

## What CivicOne Does

CivicOne is a **civic routing layer** that:
- Accepts plain-language issue descriptions from citizens
- Identifies the correct official government portal using AI
- Redirects users to the official portal cleanly and transparently

**What it is NOT**: Not a complaint filing system, not a grievance tracker, not a chatbot, not a government replacement.

## Tech Stack

### Backend
- **FastAPI** - Python web framework
- **SQLModel** - Database ORM
- **PostgreSQL** (Supabase) - Database
- **Pydantic AI** - Constrained AI agent for portal selection
- **OpenAI API** (via OpenRouter) - LLM provider

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** (shadcn/ui) - UI components

## Project Structure

```
CivicOne/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI app with CORS
│       ├── db.py                # Database connection
│       ├── models.py            # SQLModel schemas
│       ├── agents/
│       │   ├── civic_agent.py   # AI agent for portal selection
│       │   └── schemas.py       # Request/response schemas
│       ├── routes/
│       │   ├── resolve.py       # Main /resolve endpoint
│       │   └── portals.py       # Portal CRUD endpoints
│       └── services/
│           ├── portal_service.py
│           └── agent_service.py
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx         # Landing page
│       │   ├── resolve/
│       │   │   └── page.tsx     # Results page
│       │   └── api/
│       │       └── resolve/
│       │           └── route.ts # Proxy to backend
│       ├── components/
│       │   ├── ComplaintForm.tsx
│       │   ├── ResultCard.tsx
│       │   └── ErrorDisplay.tsx
│       └── lib/
│           ├── states.ts        # Indian states list
│           └── location.ts      # State detection logic
├── .env                         # Backend environment vars
├── requirements.txt             # Python dependencies
└── start-dev.bat                # Windows startup script
```

## Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL database (or Supabase account)
- OpenRouter API key

### 1. Clone & Navigate
```bash
cd C:\Projects\CivicOne
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
pip install -r ../requirements.txt

# Verify .env file exists in root with:
# - DATABASE_URL
# - OPENAI_API_KEY
# - OPENAI_BASE_URL
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Verify .env.local exists with:
# - NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Running the Application

### Windows (Recommended)
```bash
# From project root
./start-dev.bat
```

This opens two terminal windows:
- Backend on http://localhost:8000
- Frontend on http://localhost:9002

### Manual Start (Two Terminals)

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

## API Documentation

### Endpoints

#### POST /resolve
**Request:**
```json
{
  "state": "Tamil Nadu",
  "issue_text": "Street light not working in Chennai"
}
```

**Response:**
```json
{
  "portal_id": 123,
  "portal_name": "Chennai Municipal Corporation",
  "portal_url": "https://chennaicorporation.gov.in",
  "instructions": "Follow the instructions on the official portal to register your complaint.",
  "reasoning": "This portal is designated by the government of Tamil Nadu for civic issues in Chennai."
}
```

**Interactive Docs:** http://localhost:8000/docs

## User Flow

1. User describes issue in plain language
2. If location mentioned → system detects it
3. If not → system asks for state selection
4. Backend queries database for portals in that state
5. AI agent selects most appropriate portal
6. User sees portal card with official link
7. User clicks to open official government portal

## Environment Variables

### Backend (`.env` in root)
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
OPENAI_API_KEY=sk-or-v1-...
OPENAI_BASE_URL=https://openrouter.ai/api/v1
```

### Frontend (`.env.local` in frontend/)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Key Features

### ✅ Implemented
- State-based portal routing
- AI-powered portal selection (constrained, no hallucination)
- Database-backed portal catalog
- Clean, accessible UI
- Error handling and fallbacks
- CORS-enabled backend
- Environment-based configuration

### Design Principles
1. **No Hallucination**: AI selects only from database portals
2. **Transparent**: Users always redirected to official portals
3. **Neutral**: No data collection, no proxying
4. **Jurisdiction-Aware**: State-specific routing
5. **Citizen-First**: Plain language, no jargon

## Development

### Backend Hot Reload
FastAPI automatically reloads on file changes when using `--reload` flag.

### Frontend Hot Reload
Next.js automatically reloads on file changes in dev mode.

### Database Changes
After modifying models, update your database schema accordingly.

## Troubleshooting

### CORS Errors
- Check [backend/app/main.py](backend/app/main.py#L10-L18) CORS configuration
- Ensure frontend URL is in `allow_origins`

### Connection Refused
- Verify backend is running: http://localhost:8000/docs
- Check `.env.local` has correct `NEXT_PUBLIC_BACKEND_URL`

### Import Errors (Python)
```bash
pip install -r requirements.txt
```

### Module Not Found (Frontend)
```bash
cd frontend
npm install
```

## Production Considerations

1. **Database**: Populate with real government portal data
2. **API Keys**: Use production keys, not dev keys
3. **CORS**: Update `allow_origins` for production domains
4. **Environment**: Use production environment variables
5. **Error Tracking**: Add Sentry or similar
6. **Rate Limiting**: Add to protect API endpoints
7. **Caching**: Cache portal data for performance

## Documentation

- [QUICKSTART.md](QUICKSTART.md) - Testing guide
- [INTEGRATION.md](INTEGRATION.md) - Architecture details
- Backend API Docs: http://localhost:8000/docs

## License

[Your License Here]

## Support

For issues or questions, open an issue in the repository.

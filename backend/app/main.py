from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import ALL_METHODS

from .routes.resolve import router as resolve_router
from .routes.portals import router as portals_router

app = FastAPI(title="CivicOne API")

# Configure CORS - allow localhost and all Vercel domains
def is_allowed_origin(origin: str) -> bool:
    allowed = [
        "http://localhost:9002",
        "http://localhost:3000",
    ]
    
    if origin in allowed:
        return True
    
    # Allow all .vercel.app domains
    if origin.endswith(".vercel.app") and origin.startswith("https://"):
        return True
        
    return False

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_origins=[
        "http://localhost:9002",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portals_router)
app.include_router(resolve_router)

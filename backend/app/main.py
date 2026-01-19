from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.resolve import router as resolve_router
from .routes.portals import router as portals_router

app = FastAPI(title="CivicOne API")

# Configure CORS to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:9002",  # Next.js dev server
        "http://localhost:3000",  # Alternative Next.js port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portals_router)
app.include_router(resolve_router)

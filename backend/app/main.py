from fastapi import FastAPI

from app.routes.resolve import router as resolve_router
from app.routes.portals import router as portals_router

app = FastAPI(title="CivicOne API")

app.include_router(portals_router)
app.include_router(resolve_router)

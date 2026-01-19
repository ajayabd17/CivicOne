from pydantic import BaseModel
from typing import Optional

class ResolveRequest(BaseModel):
    issue_text: str
    state: Optional[str] = None

class ResolveResponse(BaseModel):
    portal_id: int
    portal_name: str
    portal_url: str
    instructions: Optional[str] = ""
    reasoning: str

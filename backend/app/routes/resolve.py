from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
import json
import re

from app.db import get_session
from app.agents.civic_agent import agent
from app.agents.schemas import ResolveRequest, ResolveResponse
from app.services.portal_service import (
    get_portals_by_state,
    get_portal_by_id,
    get_portal_instructions
)

router = APIRouter()

@router.post("/resolve")
async def resolve_issue(
    payload: ResolveRequest,
    session: Session = Depends(get_session)
):
    # 1. Mandatory state check
    if not payload.state:
        return {"message": "Please select your state to proceed."}

    # 2. Fetch candidate portals
    portals = get_portals_by_state(payload.state, session)
    if not portals:
        raise HTTPException(status_code=404, detail="No portals found for state")

    # 3. Build prompt
    prompt = f"""
You MUST respond with valid JSON only.
No prose. No explanation outside JSON.

JSON schema:
{{
  "portal_id": number,
  "portal_name": string,
  "portal_url": string,
  "reasoning": string
}}

Citizen issue:
{payload.issue_text}

Available official portals (select ONE):
{portals}
"""

    # 4. Run agent
    run_result = await agent.run(prompt)
    raw_output = run_result.output.strip()
    try:
        start = raw_output.find("{")
        end = raw_output.rfind("}")

        if start == -1 or end == -1:
            raise ValueError("No JSON object found")

        json_str = raw_output[start : end + 1]

        parsed = json.loads(json_str)
        agent_output = ResolveResponse(**parsed)

    except Exception as e:
        print("RAW OUTPUT >>>", repr(raw_output))
        print("EXTRACTED JSON >>>", json_str if 'json_str' in locals() else None)
        raise HTTPException(
            status_code=500,
            detail="AI response could not be validated"
        )
       

    # 6. Deterministic fetch from DB
    portal = get_portal_by_id(agent_output.portal_id, session)
    if not portal:
        raise HTTPException(status_code=404, detail="Selected portal not found")

    #instructions = get_portal_instructions(agent_output.portal_id, session)
    #if not instructions:
    instructions = "Follow the instructions on the official portal to register your complaint."
    # 7. Final response
    return {
        "portal_id": portal.portal_id,
        "portal_name": portal.portal_name,
        "portal_url": portal.portal_url,
        "instructions": instructions,
        "reasoning": agent_output.reasoning
    }

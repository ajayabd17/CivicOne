from app.agents.civic_agent import agent
from app.agents.schemas import AgentInput
from app.services.portal_service import get_portals_by_state

async def resolve_issue(issue_text: str, state: str):
    portals = get_portals_by_state(state)

    prompt = f"""
Citizen issue:
{issue_text}

Available official portals:
{portals}
"""

    result = await agent.run(prompt)
    return result

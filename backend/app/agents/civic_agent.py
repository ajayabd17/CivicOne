from dotenv import load_dotenv
load_dotenv()

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel

openrouter_model = OpenAIModel(
    "meta-llama/llama-3.3-70b-instruct"
)

agent = Agent(
    model=openrouter_model,
    system_prompt="""
You are CivicOne, a civic routing agent for India.

Task:
- You are given a list of official portals with their portal_id.
- You must return ONLY the portal_id of the most appropriate portal.
- Return ONLY the number.
- No text. No explanation. No JSON. No formatting.
"""
)


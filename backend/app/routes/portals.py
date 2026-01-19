from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..db import get_session
from ..models import State, Authority, Portal

router = APIRouter()

@router.get("/portals/by-state/{state_name}")
def get_portals_by_state(
    state_name: str,
    session: Session = Depends(get_session)
):
    state = session.exec(
        select(State).where(State.state_name == state_name)
    ).first()

    if not state:
        raise HTTPException(status_code=404, detail="State not found")

    statement = (
        select(Portal, Authority)
        .join(Authority, Portal.authority_id == Authority.authority_id)
        .where(Authority.state_id == state.state_id)
    )

    results = session.exec(statement).all()

    response = []
    for portal, authority in results:
        response.append({
            "portal_name": portal.portal_name,
            "portal_url": portal.portal_url,
            "authority_name": authority.authority_name,
            "authority_level": authority.level
        })

    return response

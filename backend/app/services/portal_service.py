from sqlmodel import Session, select
from app.models import Portal
from app.db import get_session

from sqlmodel import Session, select
from app.models import Portal, Authority, State

def get_portal_by_id(portal_id: int, session: Session):
    statement = select(Portal).where(Portal.portal_id == portal_id)
    return session.exec(statement).first()


def get_portals_by_state(state_name: str, session: Session):
    statement = (
        select(Portal.portal_id, Portal.portal_name, Portal.portal_url)
        .join(Authority, Portal.authority_id == Authority.authority_id)
        .join(State, Authority.state_id == State.state_id)
        .where(State.state_name == state_name)
    )

    return session.exec(statement).all()



from sqlmodel import Session, text

def get_portal_instructions(portal_id: int, session: Session):
    result = session.exec(
        text("SELECT instructions FROM portal_instructions WHERE portal_id = :pid")
    ).params(pid=portal_id).first()

    return result[0] if result else ""



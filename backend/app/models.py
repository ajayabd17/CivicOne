from sqlmodel import SQLModel, Field
from typing import Optional

class State(SQLModel, table=True):
    __tablename__ = "state_table"
    state_id: int = Field(primary_key=True)
    state_name: str


class Authority(SQLModel, table=True):
    __tablename__ =  "authority_table"
    authority_id: int = Field(primary_key=True)
    state_id: int = Field(foreign_key="state_table.state_id")
    authority_name: str
    level: str


class Portal(SQLModel, table=True):
    __tablename__ =  "portals_table"
    portal_id: int = Field(primary_key=True)
    authority_id: int = Field(foreign_key="authority_table.authority_id")
    portal_name: str
    portal_url: str

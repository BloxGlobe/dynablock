# src/modules/Auth/sessions/session.py
import uuid

SESSIONS = {}

def create_session(user_id: str):
    session_id = str(uuid.uuid4())
    SESSIONS[session_id] = user_id
    return session_id

def get_user(session_id: str):
    return SESSIONS.get(session_id)

def destroy_session(session_id: str):
    if session_id in SESSIONS:
        del SESSIONS[session_id]

# src/modules/Auth/auth.py
from users.signup import signup_user
from users.login import login_user
from sessions.session import create_session

# TEMP in-memory storage (replace with DB later)
USERS = {}

def signup(username, email, password):
    result = signup_user(username, email, password, USERS)

    if "error" in result:
        return result

    session_id = create_session(result["user_id"])
    return {"success": True, "session_id": session_id}

def login(username, password):
    result = login_user(username, password, USERS)

    if "error" in result:
        return result

    session_id = create_session(result["user"]["id"])
    return {"success": True, "session_id": session_id}

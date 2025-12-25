# src/modules/Auth/users/signup.py
import hashlib
import uuid

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def signup_user(username: str, email: str, password: str, storage: dict):
    if username in storage:
        return {"error": "Username already exists"}

    user_id = str(uuid.uuid4())
    storage[username] = {
        "id": user_id,
        "username": username,
        "email": email,
        "password": hash_password(password)
    }

    return {"success": True, "user_id": user_id}

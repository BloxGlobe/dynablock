# src/modules/Auth/users/login.py
import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def login_user(username: str, password: str, storage: dict):
    user = storage.get(username)

    if not user:
        return {"error": "User not found"}

    if user["password"] != hash_password(password):
        return {"error": "Invalid credentials"}

    return {"success": True, "user": user}

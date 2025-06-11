from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserLogin
from app.db.client import db

router = APIRouter()

@router.post("/register")
async def register_user(user: UserCreate):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    await db.users.insert_one(user.dict())
    return {"message": "User registered successfully"}


@router.post("/login")
async def login_user(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})

    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user": {"name": user["name"], "email": user["email"]}}
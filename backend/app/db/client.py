from motor.motor_asyncio import AsyncIOMotorClient
from os import getenv

MONGO_URI = getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URI)
db = client["ECommerceTest"]

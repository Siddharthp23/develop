from fastapi import APIRouter, Depends
from app.schemas.cart import CartItem, CartResponse
from app.db.client import db
from app.deps.auth import get_current_user

router = APIRouter()

@router.post("/cart")
async def add_item_to_cart(item: CartItem, user_email: str = Depends(get_current_user)):
    item_dict = item.dict()
    item_dict["user_email"] = user_email
    await db.cart.insert_one(item_dict)
    return {"message": "Item added to cart"}

@router.get("/cart", response_model=CartResponse)
async def get_cart_items(user_email: str = Depends(get_current_user)):
    items_cursor = db.cart.find({"user_email": user_email})
    items = []
    total = 0.0

    async for item in items_cursor:
        item_data = {
            "name": item["name"],
            "price": item["price"],
            "quantity": item["quantity"]
        }
        items.append(item_data)
        total += item["price"] * item["quantity"]

    return {"items": items, "total": total}

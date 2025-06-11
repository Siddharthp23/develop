from fastapi import APIRouter
from app.schemas.cart import CartItem
from app.schemas.cart import CartResponse
from app.db.client import db

router = APIRouter()

@router.post("/cart")
async def add_item_to_cart(item: CartItem):
    await db.cart.insert_one(item.dict())
    return {"message": "Item added to cart"}

@router.get("/cart", response_model=CartResponse)
async def get_cart_items():
    items_cursor = db.cart.find()
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

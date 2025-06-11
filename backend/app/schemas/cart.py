from pydantic import BaseModel
from typing import List

class CartItem(BaseModel):
    name: str
    price: float
    quantity: int
class CartResponse(BaseModel):
    items: List[CartItem]
    total: float
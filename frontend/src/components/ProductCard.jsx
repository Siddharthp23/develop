import React from "react";
import { FaShoppingBag } from "react-icons/fa";

export default function ProductCard({ image, name, price }) {
  const handleAddToCart = async () => {
    const item = {
      name,
      price,
      quantity: 1,
    };

    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart!");
        window.dispatchEvent(new Event("cart-updated")); // 👈 this notifies others
      } else {
        console.error("Error:", data);
        alert(`Failed to add to cart: ${data.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Server error!");
    }
  };

  return (
    <div className="product-card card">
      <img src={image} alt={name} />
      <div className="details">
        <p className="name">{name}</p>
        <p className="buy-text">Buy at</p>
        <p className="price">{price}/-</p>
        <FaShoppingBag className="cart-icon" onClick={handleAddToCart} />
      </div>
    </div>
  );
}

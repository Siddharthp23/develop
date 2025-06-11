import React, { useEffect, useState } from "react";

export default function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cart");
      const data = await response.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems(); // initial load

    const updateHandler = () => fetchCartItems(); // reload on cart update
    window.addEventListener("cart-updated", updateHandler);

    return () => window.removeEventListener("cart-updated", updateHandler);
  }, []);

  return (
    <aside className="order-summary card">
      <h3>Order Summary</h3>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div className="summary-item" key={index}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))
      )}

      <div className="summary-item total">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button className="checkout-btn">Proceed to Checkout</button>
    </aside>
  );
}

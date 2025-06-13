import { useEffect, useState } from "react";
import { addToCart } from "../utils/api";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🛑 Don't fetch cart if user is not logged in
    if (!token) return;

    fetch("http://localhost:8000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error("Cart fetch failed:", err.message);
      });
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map((item, index) => (
        <p key={index}>{item.name} - {item.quantity}</p>
      ))}
    </div>
  );
}
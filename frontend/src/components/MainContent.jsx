import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import OrderSummary from "./OrderSummary";

export default function MainContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="main-container">
      <div className="left-panel">
        <ProductList />
      </div>
      <div className="right-panel">
        {isLoggedIn ? <OrderSummary /> : null}
      </div>
    </div>
  );
}

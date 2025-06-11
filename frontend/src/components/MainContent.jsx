import React from "react";
import ProductList from "./ProductList"; // renders multiple <ProductCard />
import OrderSummary from "./OrderSummary";

export default function MainContent() {
  return (
    <div className="main-container">
      <div className="left-panel">
        <ProductList />
      </div>
      <div className="right-panel">
        <OrderSummary />
      </div>
    </div>
  );
}

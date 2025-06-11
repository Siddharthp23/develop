import React from "react";
import visa from "../assets/visa_icon.png";
import paypal from "../assets/paypal.png";
//import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h4>ClicKart</h4>
          <p>Who We Are</p>
          <p>Join Our Team</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          <p>Track Order</p>
          <p>FAQs</p>
          <p>Payments</p>
        </div>
        <div className="footer-column">
          <h4>Shop By</h4>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Pinterest</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Payment Methods</p>
        <div className="payment-logos">
          <img src={visa} alt="Visa" />
          <img src={paypal} alt="PayPal" />
        </div>
      </div>
    </footer>
  );
}

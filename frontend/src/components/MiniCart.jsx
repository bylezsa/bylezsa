import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import "../styles/MiniCart.css";

export default function MiniCart() {
  const { items, itemCount, totalCents } = useCart();

  return (
    <div className="mini-cart-container">
      <Link to="/cart" className="mini-cart-button">
        <svg className="cart-icon" viewBox="0 0 24 24" fill="none">
          <path 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </svg>
        <span>Carrito</span>
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </Link>

      {items.length > 0 && (
        <div className="mini-cart-dropdown">
          <ul className="mini-cart-list">
            {items.map(it => (
              <li key={it.id} className="mini-cart-item">
                <div>
                  <div className="mini-cart-item-name">{it.name}</div>
                  <div className="mini-cart-item-price">
                    {it.qty} × {(it.price_cents/100).toFixed(2)} CUP
                  </div>
                </div>
                <div className="mini-cart-item-total">
                  {(it.qty * (it.price_cents/100)).toFixed(2)} CUP
                </div>
              </li>
            ))}
          </ul>

          <div className="mini-cart-footer">
            <div className="mini-cart-total">
              Total: {(totalCents/100).toFixed(2)} CUP
            </div>
            <Link to="/checkout" className="mini-cart-pay-btn">
              Pagar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

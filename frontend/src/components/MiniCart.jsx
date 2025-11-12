// src/components/MiniCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MiniCart() {
  const { items, itemCount, totalCents } = useCart();

  return (
    <div className="relative">
      <Link to="/cart" className="inline-flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5"/></svg>
        <span>Carrito</span>
        {itemCount > 0 && <span className="ml-1 inline-block bg-red-500 text-white text-xs px-2 rounded-full">{itemCount}</span>}
      </Link>

      {items.length > 0 && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow p-3 z-50">
          <ul className="space-y-2 max-h-56 overflow-auto">
            {items.map(it => (
              <li key={it.id} className="flex justify-between text-sm">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-gray-500">{it.qty} × {(it.price_cents/100).toFixed(2)} CUP</div>
                </div>
                <div className="text-right">
                  {(it.qty * (it.price_cents/100)).toFixed(2)} CUP
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <div className="font-semibold">Total: {(totalCents/100).toFixed(2)} CUP</div>
            <Link to="/checkout" className="px-3 py-1 bg-green-600 text-white rounded">Pagar</Link>
          </div>
        </div>
      )}
    </div>
  );
}

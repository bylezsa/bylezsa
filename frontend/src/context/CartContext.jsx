// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatCurrencyCUP } from '../services/format';
import api from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  // persistimos en localStorage con versión para migraciones seguras
  const [items, setItems] = useLocalStorage('bylezsa_cart_v2', []);
  const [loading, setLoading] = useState(false);

  // Calculados
  const totalCents = useMemo(() => items.reduce((s, it) => s + (it.qty * (it.price_cents ?? 0)), 0), [items]);
  const itemCount = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  // Añadir (si existe, suma qty)
  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: Math.min((copy[idx].qty || 0) + qty, product.stock ?? 9999) };
        return copy;
      }
      return [...prev, { id: product.id, name: product.name, price_cents: product.price_cents, sku: product.sku, qty: Math.min(qty, product.stock ?? 9999), images: product.images }];
    });
  };

  const updateQty = (productId, qty) => {
    setItems(prev => prev.map(it => it.id === productId ? { ...it, qty: Math.max(1, qty) } : it));
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(it => it.id !== productId));
  };

  const clear = () => setItems([]);

  // Crear orden en backend (opcional) — devuelve { id }
  const createOrder = async ({ name, phone, address, channel = 'whatsapp_link' }) => {
    if (!name || !phone || items.length === 0) throw new Error('Datos incompletos o carrito vacío');
    setLoading(true);
    try {
      const payload = {
        name, phone, address,
        items: items.map(i => ({ product_id: i.id, name: i.name, qty: i.qty, price_cents: i.price_cents })),
        total_cents: totalCents,
        channel
      };
      const res = await api.post('/orders', payload);
      return res.data; // debería contener { id }
    } finally {
      setLoading(false);
    }
  };

  // función utilitaria para construir texto whatsapp (también exportable)
  const buildWhatsAppText = (orderId, { name, phone, address }) => {
    const lines = [];
    lines.push(`*Nueva orden - BYLEZSA*`);
    lines.push(`ID: ${orderId || 'pendiente'}`);
    lines.push(`Cliente: ${name}`);
    lines.push(`Tel: ${phone}`);
    if (address) lines.push(`Dirección: ${address}`);
    lines.push('');
    lines.push(`*Items:*`);
    items.forEach(it => lines.push(`${it.qty} x ${it.name} — ${formatCurrencyCUP((it.price_cents ?? 0) / 100)}`));
    lines.push('');
    lines.push(`Total: ${formatCurrencyCUP(totalCents / 100)}`);
    lines.push('');
    lines.push(`Método: Pedido por WhatsApp`);
    return encodeURIComponent(lines.join('\n'));
  };

  return (
    <CartContext.Provider value={{
      cart: items, 
      items,
      addItem, updateQty, removeItem, clear,
      totalCents, itemCount, loading, createOrder, buildWhatsAppText
    }}>
      {children}
    </CartContext.Provider>

  );
}

export const useCart = () => useContext(CartContext);

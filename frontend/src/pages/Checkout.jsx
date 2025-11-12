// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // si usas react-router
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, totalCents, clear, createOrder, buildWhatsAppText } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate?.() || (() => {});

  const adminPhone = import.meta.env.VITE_ADMIN_PHONE || '53NNNNNNNNN';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return alert('Por favor ingresa nombre y teléfono.');
    if (!items || items.length === 0) return alert('El carrito está vacío.');

    setSending(true);
    let orderId = null;
    try {
      // Intenta crear la order en backend (si falla, seguimos para abrir WA)
      try {
        const res = await createOrder({ name, phone, address });
        orderId = res?.id;
      } catch (err) {
        console.warn('No se pudo crear orden en backend:', err?.message || err);
      }

      // Preparar texto y abrir WhatsApp
      const text = buildWhatsAppText(orderId, { name, phone, address });
      const waUrl = `https://wa.me/${adminPhone}?text=${text}`;
      window.open(waUrl, '_blank');

      // Limpia carrito si la UI lo requiere
      clear();

      // Redirige o muestra confirmación
      alert('Se abrió WhatsApp. Envía el mensaje para confirmar la orden.');
      navigate('/'); // o a página de confirmación si la tienes
    } catch (err) {
      console.error(err);
      alert('Error procesando la orden. Intenta nuevamente o contacta por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finalizar compra</h1>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input className="p-2 border rounded" placeholder="Nombre completo" value={name} onChange={e => setName(e.target.value)} required />
        <input className="p-2 border rounded" placeholder="Teléfono (ej: 53XXXXXXXXX)" value={phone} onChange={e => setPhone(e.target.value)} required />
        <textarea className="p-2 border rounded" placeholder="Dirección (opcional)" value={address} onChange={e => setAddress(e.target.value)} />
        <div className="text-right font-semibold">Total: {(totalCents/100).toFixed(2)} CUP</div>

        <button type="submit" disabled={sending} className="px-4 py-2 rounded bg-green-600 text-white">
          {sending ? 'Procesando...' : 'Enviar pedido por WhatsApp'}
        </button>
      </form>

      <section className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Resumen</h2>
        {items.length === 0 ? <p className="text-gray-600">Tu carrito está vacío.</p> : (
          <ul className="mt-2 space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex justify-between">
                <div>{it.qty} × {it.name}</div>
                <div>{((it.price_cents ?? 0) * it.qty / 100).toFixed(2)} CUP</div>
              </li>
            ))}
            <li className="flex justify-between font-semibold">
              <div>Total</div>
              <div>{(totalCents/100).toFixed(2)} CUP</div>
            </li>
          </ul>
        )}
      </section>
    </main>
  );
}

import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      setError('Debes iniciar sesión para realizar la compra.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cart.map(({ productId, name, price, quantity }) => ({ productId, name, price, quantity })),
          total,
        }),
      });
      if (!res.ok) throw new Error('No se pudo crear la orden');
  setSuccess('¡Orden enviada a WhatsApp! Pronto te contactaremos.');
  toast.success('¡Orden enviada a WhatsApp!');
  clearCart();
    } catch (err) {
  setError(err.message);
  toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return <div className="text-center py-16 text-gray-400 text-lg">Tu carrito está vacío.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mt-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Carrito de compras</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <div className="overflow-x-auto">
        <table className="w-full mb-8 text-base">
          <thead>
            <tr className="text-left border-b text-gray-500">
              <th className="py-2 font-semibold">Producto</th>
              <th className="py-2 font-semibold">Precio</th>
              <th className="py-2 font-semibold">Cantidad</th>
              <th className="py-2 font-semibold">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.productId} className="border-b last:border-0">
                <td className="py-2 font-medium text-gray-900">{item.name}</td>
                <td className="py-2">${item.price}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    >-</button>
                    <span className="mx-2 w-8 text-center inline-block">{item.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >+</button>
                  </div>
                </td>
                <td className="py-2 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="py-2">
                  <button
                    className="text-red-500 hover:underline text-sm"
                    onClick={() => removeFromCart(item.productId)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <button
          className="text-gray-500 hover:underline text-base"
          onClick={clearCart}
        >Vaciar carrito</button>
        <span className="text-2xl font-bold text-pink-600">Total: ${total.toFixed(2)}</span>
      </div>
      <button
        className="w-full px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-semibold text-lg shadow transition"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Finalizar compra'}
      </button>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch('/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar las órdenes');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user, token]);

  if (!user) return <div className="text-center py-10">Debes iniciar sesión para ver tu perfil.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mt-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Perfil de usuario</h1>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-gray-500 text-xs mb-1">Nombre</div>
          <div className="font-semibold text-lg text-gray-900">{user.name}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-gray-500 text-xs mb-1">Email</div>
          <div className="font-semibold text-lg text-gray-900">{user.email}</div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-pink-600">Historial de órdenes</h2>
      {loading ? (
        <div className="text-center py-6">Cargando órdenes...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-400">No tienes órdenes registradas.</div>
      ) : (
        <ul className="divide-y">
          {orders.map(order => (
            <li key={order._id} className="py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="font-semibold text-gray-900">#{order._id.slice(-6)}</span>
                <span className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</span>
                <span className="font-bold text-pink-600 text-lg">${order.total}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {order.products.map(p => `${p.name} x${p.quantity}`).join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se encontró el producto');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Cargando producto...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10 border border-gray-100 mt-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product.image_url || '/vite.svg'}
            alt={product.name}
            className="w-full max-w-xs h-80 object-cover rounded-2xl shadow-md border border-gray-200"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900 leading-tight">{product.name}</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
          <span className="text-2xl font-bold text-pink-600 mb-8 block">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-semibold shadow transition text-lg"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
      <ProductReviews />
    </>
  );
}

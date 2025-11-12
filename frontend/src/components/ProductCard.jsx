import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wish = isInWishlist(product.id);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart(product);
    toast.success('Producto añadido al carrito', {
      icon: '🛒',
      style: { fontWeight: 600, fontFamily: 'Inter, sans-serif' }
    });
    setTimeout(() => setAdded(false), 700);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    wish ? removeFromWishlist(product.id) : addToWishlist(product.id);
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col border border-gray-100 dark:border-gray-800 hover:border-pink-200 dark:hover:border-pink-400 overflow-hidden group opacity-0 translate-y-6 animate-fadein"
      style={{ animationDelay: `${Math.random() * 0.2 + 0.05}s` }}
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image_url || '/vite.svg'}
            alt={`${product.name}`}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow transition-all ${wish ? 'text-pink-600 scale-110' : 'text-gray-300 dark:text-gray-500 hover:text-pink-400 dark:hover:text-pink-400'}`}
          aria-label={wish ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg
            className={`w-6 h-6 transition-all duration-200 ${wish ? 'fill-pink-600' : 'fill-none'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-pink-600 dark:text-pink-400 font-bold text-lg">${product.price}</span>
          {onAddToCart && (
            <button
              onClick={handleAdd}
              className={`ml-2 px-4 py-1.5 bg-pink-600 dark:bg-pink-700 text-white rounded-full shadow text-sm font-semibold transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-pink-400 ${added ? 'ring-2 ring-pink-400 scale-105 bg-pink-700 dark:bg-pink-800' : 'hover:bg-pink-700 dark:hover:bg-pink-800 active:scale-95'}`}
            >
              {added ? (
                <span className="flex items-center gap-1 animate-bounce">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ¡Agregado!
                </span>
              ) : (
                'Añadir'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;

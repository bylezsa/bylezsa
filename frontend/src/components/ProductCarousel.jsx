import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?limit=12')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-2 md:px-8 mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-pink-600 text-2xl">🔥</span> Productos destacados
      </h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent snap-x">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-60 h-80 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
            ))
          ) : (
            products.map(product => (
              <div key={product.id} className="w-60 flex-shrink-0 snap-center">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

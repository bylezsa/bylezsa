import { useEffect, useState } from 'react';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.slice(0, 6)); // Solo las 6 primeras
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto mb-10 px-2 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Categorías destacadas</h2>
      {loading ? (
        <div className="flex gap-4 justify-center md:justify-start">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-32 h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map(cat => (
            <a
              key={cat.id}
              href={`#productos`}
              className="group w-32 h-32 bg-white rounded-xl shadow hover:shadow-xl border border-gray-100 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-pink-50 hover:border-pink-200 opacity-0 translate-y-6 animate-fadein"
              style={{ animationDelay: `${0.1 + 0.05 * Math.random()}s` }}
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-2xl font-bold group-hover:bg-pink-200 transition">
                {cat.icon || '🛍️'}
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition line-clamp-2 text-center">{cat.name}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

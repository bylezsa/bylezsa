import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import ProductCarousel from '../components/ProductCarousel';
import InspirationGrid from '../components/InspirationGrid';
import TrustBanner from '../components/TrustBanner';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  const { addToCart } = useCart();
  const { wishlist } = useWishlist();

  // Obtener categorías
  useEffect(() => {
    let isMounted = true;
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => { if(isMounted) setCategories(data); })
      .catch(console.error);
    return () => { isMounted = false; };
  }, []);

  // Obtener productos filtrados
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    let url = `/api/products?search=${encodeURIComponent(search)}`;
    if (category) url += `&categoryId=${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => { 
        if(isMounted){ 
          setProducts(data.products || []); 
          setLoading(false); 
        } 
      })
      .catch(err => { console.error(err); setLoading(false); });

    return () => { isMounted = false; };
  }, [search, category]);

  // Filtrar favoritos si toggle activo
  const displayedProducts = showFavs ? products.filter(p => wishlist.includes(p.id)) : products;

  return (
    <div>
      <Hero />
      <TrustBanner />
      <FeaturedCategories />
      <ProductCarousel />
      <InspirationGrid />

      <h1 className="text-2xl font-bold mb-4 text-pink-600" id="productos">Productos destacados</h1>

      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
      <SearchBar search={search} onSearch={setSearch} showFavs={showFavs} toggleFavs={() => setShowFavs(f => !f)} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl shadow p-4 flex flex-col gap-4 border border-gray-100">
              <div className="bg-gray-200 h-40 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="flex gap-2 mt-2">
                <div className="h-8 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-8 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No se encontraron productos.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadein">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

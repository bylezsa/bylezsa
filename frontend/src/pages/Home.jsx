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
import '../styles/Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  const { addItem } = useCart();
  const { wishlist } = useWishlist();

  // Obtener categorías
  useEffect(() => {
    let isMounted = true;
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => { if (isMounted) setCategories(data); })
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
        if (isMounted) {
          setProducts(data.products || []);
          setLoading(false);
        }
      })
      .catch(err => { console.error(err); setLoading(false); });

    return () => { isMounted = false; };
  }, [search, category]);

  // Filtrar favoritos si toggle activo
  const displayedProducts = showFavs
    ? products.filter(p => wishlist.includes(p.id))
    : products;

  return (
    <div className="home-container">
      <Hero />
      <TrustBanner />
      <FeaturedCategories />
      <ProductCarousel />
      <InspirationGrid />

      <section className="products-section" id="productos">
        <h1 className="section-title">Productos destacados</h1>

        <div className="filters-container">
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
          <SearchBar
            search={search}
            onSearch={setSearch}
            showFavs={showFavs}
            toggleFavs={() => setShowFavs(f => !f)}
          />
        </div>

        {loading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img shimmer" />
                <div className="skeleton-line shimmer w-3/4" />
                <div className="skeleton-line shimmer w-1/2" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="empty-state">No se encontraron productos.</div>
        ) : (
          <div className="products-grid fade-in">
            {displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

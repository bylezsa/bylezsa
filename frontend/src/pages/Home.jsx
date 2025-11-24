import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import ProductCarousel from "../components/ProductCarousel";
import InspirationGrid from "../components/InspirationGrid";
import TrustBanner from "../components/TrustBanner";
import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showFavs, setShowFavs] = useState(false);

  const { addItem } = useCart();
  const { wishlist } = useWishlist();

  /* ============================================
     FETCH CATEGORIES (Solo 1 vez)
  ============================================ */
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/categories", { signal: controller.signal })
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, []);

  /* ============================================
     FETCH PRODUCTS (reacciona a search + category)
  ============================================ */
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const url = new URL("/api/products", window.location.origin);
    url.searchParams.append("search", search);
    if (category) url.searchParams.append("categoryId", category);

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [search, category]);

  /* ============================================
     FILTER FAVORITES (optimizado con useMemo)
  ============================================ */
  const displayedProducts = useMemo(() => {
    return showFavs
      ? products.filter((p) => wishlist.includes(p.id))
      : products;
  }, [showFavs, products, wishlist]);

  /* ============================================
     RENDER
  ============================================ */

  return (
    <div className="home-container">

      {/* ==================== FILTROS SUPERIORES ==================== */}
      <div className="filters-top container px-4 py-4">
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        <SearchBar
          search={search}
          onSearch={setSearch}
          showFavs={showFavs}
          toggleFavs={() => setShowFavs((f) => !f)}
        />
      </div>

      {/* ==================== SECCIONES DECORATIVAS ==================== */}
      <Hero />
      <TrustBanner />
      <FeaturedCategories />
      <ProductCarousel />
      <InspirationGrid />

      {/* ==================== PRODUCTOS PRINCIPALES ==================== */}
      <section className="products-section" id="productos">
        <h1 className="section-title">Productos destacados</h1>

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
            {displayedProducts.map((product) => (
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

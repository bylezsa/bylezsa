import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductCarousel.css";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="carousel-container">
      <h2 className="carousel-title">
        <span className="emoji-hot">🔥</span> Productos destacados
      </h2>

      <div className="carousel-wrapper">
        <div className="carousel-scroll">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="product-skeleton" />
              ))
            : products.map((product) => (
                <div key={product.id} className="product-slide">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

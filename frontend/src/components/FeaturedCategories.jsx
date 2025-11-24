import { useEffect, useState } from "react";
import "../styles/FeaturedCategories.css";

export default function FeaturedCategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CATEGORÍAS PROVISIONALES ---
  const fallback = [
    { id: 1, name: "Belleza", icon: "💄" },
    { id: 2, name: "Aseo del Hogar", icon: "🧼" },
    { id: 3, name: "Limpieza", icon: "🧽" },
    { id: 4, name: "Ropa & Moda", icon: "👚" },
    { id: 5, name: "Cocina", icon: "🍽️" },
    { id: 6, name: "Perfumería", icon: "🌸" },
    { id: 7, name: "Niños y Bebés", icon: "🧸" },
    { id: 8, name: "Electrodomésticos", icon: "⚡" }
  ];

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(fallback);
        }
        setLoading(false);
      })
      .catch(() => {
        setCategories(fallback);
        setLoading(false);
      });
  }, []);

  return (
    <section className="fc-slider-section">
      <h2 className="fc-slider-title">Explora por categoría</h2>

      <div className="fc-slider">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="fc-skeleton"></div>
            ))
          : categories.map((cat) => (
              <a
                key={cat.id}
                href="#productos"
                className="fc-slide-item"
              >
                <div className="fc-slide-icon">{cat.icon || "🛍️"}</div>
                <span className="fc-slide-name">{cat.name}</span>
              </a>
            ))}
      </div>
    </section>
  );
}

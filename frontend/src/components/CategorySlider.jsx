import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CategorySlider.css";

export default function CategorySlider() {
  const sliderRef = useRef(null);

  const categories = [
    "Ropa",
    "Aseo",
    "Cocina",
    "Electrodomésticos",
    "Hogar",
    "Higiene",
    "Bebés",
    "Herramientas",
    "Ofertas",
    "Plásticos",
    "Limpieza",
    "Calzado",
    "Belleza",
  ];

  // Duplicamos la lista para scroll infinito
  const display = [...categories, ...categories];

  useEffect(() => {
    const slider = sliderRef.current;

    let pos = 0;
    let animationFrame;

    const step = () => {
      pos -= 0.5; // velocidad
      if (Math.abs(pos) >= slider.scrollWidth / 2) pos = 0;
      slider.style.transform = `translateX(${pos}px)`;
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="category-bar-wrapper">
      <div className="category-slider" ref={sliderRef}>
        {display.map((cat, i) => (
          <Link key={i} to={`/categoria/${cat}`} className="category-item">
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

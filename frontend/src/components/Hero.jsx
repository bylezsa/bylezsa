import "../styles/Hero.css";
import { FaLeaf, FaStar, FaHeart } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
      </div>

      {/* Texto */}
      <div className="hero-content">
        <h1>
          Descubre tu <span>belleza</span> y bienestar
        </h1>

        <p>
          Productos premium para tu hogar, cuidado personal y mucho más.  
          Vive la experiencia <strong>Las AA Store</strong>.
        </p>

        <a href="#productos" className="hero-btn">
          Ver productos
        </a>

        {/* Iconos / Beneficios */}
        <div className="hero-icons">
          <div className="icon-box">
            <FaLeaf className="icon" />
            <span>Calidad garantizada</span>
          </div>

          <div className="icon-box">
            <FaStar className="icon" />
            <span>Los más vendidos</span>
          </div>

          <div className="icon-box">
            <FaHeart className="icon" />
            <span>Favoritos del público</span>
          </div>
        </div>
      </div>

      {/* Imagen principal */}
      <div className="hero-image-wrapper">
        <img
          src="/hero-premium.png"
          alt="Hero Las AA Store"
          className="hero-image"
        />
      </div>
    </section>
  );
}

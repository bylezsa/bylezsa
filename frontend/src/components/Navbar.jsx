import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart = [] } = useCart();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  // === Detecta scroll para shrink ===
  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // === Links del menú ===
  const navLinks = useMemo(
    () => [
      { to: "/", label: "Inicio" },
      { to: "/cart", label: "Carrito", icon: "🛒", badge: cart.length },
      { to: "/profile", label: "Perfil", icon: "👤", auth: true },
    ],
    [cart.length]
  );

  // === Renderiza enlaces (desktop / mobile) ===
  const renderLinks = (className, onClick) =>
    navLinks
      .filter((l) => !l.auth || user)
      .map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className={`${className} ${
            location.pathname === l.to ? "active" : ""
          }`}
          onClick={onClick}
        >
          {l.icon && <span className="icon">{l.icon}</span>}
          {l.label}
          {l.badge > 0 && <span className="badge">{l.badge}</span>}
        </Link>
      ));

  return (
    <header className={`navbar ${shrink ? "shrink" : ""}`}>
      <div className="nav-inner">
        
        {/* === Logo === */}
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Logo" />
        </Link>

        {/* === Desktop menu === */}
        <nav className="nav-links">
          {renderLinks("nav-link")}
          {user ? (
            <button className="btn-logout" onClick={logout}>Salir</button>
          ) : (
            <>
              <Link to="/login" className="btn-auth">Ingresar</Link>
              <Link to="/register" className="btn-auth secondary">
                Registrarse
              </Link>
            </>
          )}
        </nav>

        {/* === Hamburger === */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* === Mobile menu === */}
      {open && (
        <div className="nav-mobile">
          {renderLinks("nav-mobile-link", () => setOpen(false))}

          {user ? (
            <button
              className="nav-mobile-link"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Salir
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-mobile-link"
                onClick={() => setOpen(false)}
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="nav-mobile-link"
                onClick={() => setOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </header> 
  );
}

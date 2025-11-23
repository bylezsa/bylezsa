import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import '../styles/Navbar.css';

export default function Navbar({ dark, setDark }) {
  const { user, logout } = useAuth();
  const { cart } = useCart() || { cart: [] };
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/cart', label: 'Carrito' },
    { to: '/profile', label: 'Perfil', auth: true },
  ];

  return (
    <header className="navbar">
     {/* === Primera barra (links y menú) === */}
      <div className="nav-top">
        <div className="nav-links">
          {navLinks.map((link) => {
            if ((link.auth && !user) || (link.guest && user)) return null;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
                {link.to === '/cart' && cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </Link>
            );
          })}
          {user ? (
            <button onClick={handleLogout} className="nav-button logout">Salir</button>
          ) : (
            <>
              <Link to="/login" className="nav-button">Ingresar</Link>
              <Link to="/register" className="nav-button secondary">Registrarse</Link>
            </>
          )}

          <button onClick={() => setOpen(!open)} className="nav-menu-button">
            ☰
          </button>
        </div>

      </div>


      {/* === Segunda barra (logo centrado) === */}
      <div className="nav-bottom">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-mark">AA</span>
          <span className="nav-logo-text">Store</span>
        </Link>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="nav-mobile">
          {navLinks.map((link) => {
            if ((link.auth && !user) || (link.guest && user)) return null;
            return (
              <Link key={link.to} to={link.to} className="nav-link-mobile">
                {link.label}
              </Link>
            );
          })}
          {user ? (
            <button onClick={handleLogout} className="nav-link-mobile">Salir</button>
          ) : (
            <>
              <Link to="/login" className="nav-link-mobile">Ingresar</Link>
              <Link to="/register" className="nav-link-mobile">Registrarse</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

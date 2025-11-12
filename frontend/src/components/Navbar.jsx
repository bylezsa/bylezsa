import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import '../styles/Navbar.css';

export default function Navbar({ dark, setDark }) {
  const { user, logout } = useAuth();
  const { cart } = useCart() || { cart: [] }; // Previene error si cart es undefined
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/cart', label: 'Carrito' },
    { to: '/profile', label: 'Perfil', auth: true },
    { to: '/login', label: 'Ingresar', guest: true },
    { to: '/register', label: 'Registrarse', guest: true },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <span className="logo-badge">AA</span>
          <span className="logo-text">Store</span>
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button
          onClick={() => setOpen(!open)}
          className={`menu-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* LINKS */}
        <div className={`menu ${open ? 'menu-open' : ''}`}>
          {navLinks.map((link, i) => {
            if ((link.auth && !user) || (link.guest && user)) return null;

            const isActive = location.pathname === link.to;

            if (link.to === '/cart') {
              return (
                <Link
                  key={i}
                  to={link.to}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  🛒 {link.label}
                  {cart?.length > 0 && (
                    <span className="cart-badge">{cart.length}</span>
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={i}
                to={link.to}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}

          {user && (
            <button onClick={handleLogout} className="btn-logout">
              Salir
            </button>
          )}

          {/* TOGGLE MODO OSCURO */}
          <button
            onClick={() => setDark((d) => !d)}
            className="btn-darkmode"
            aria-label="Cambiar modo"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function Navbar({ dark, setDark }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
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
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b shadow-sm sticky top-0 z-50 transition-colors">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-pink-600 dark:text-pink-400">
          <span className="rounded-full bg-pink-100 dark:bg-gray-800 px-3 py-1 text-pink-600 dark:text-pink-300 shadow">AA</span>
          <span className="hidden sm:inline">Store</span>
        </Link>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? '✖' : '☰'}
        </button>

        {/* Links */}
        <div className={`flex-1 sm:flex sm:items-center sm:justify-end gap-2 sm:gap-4 text-base font-medium ${open ? 'block' : 'hidden'} sm:block`}>
          {navLinks.map((link, i) => {
            // Mostrar solo links permitidos según auth
            if ((link.auth && !user) || (link.guest && user)) return null;

            if (link.to === '/cart') {
              return (
                <Link
                  key={i}
                  to={link.to}
                  className={`relative hover:text-pink-600 dark:hover:text-pink-400 transition ${location.pathname === link.to ? 'font-bold' : ''}`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.label}
                  {cart.length > 0 && (
                    <span className="ml-1 bg-pink-600 text-white rounded-full px-2 text-xs font-bold absolute -top-2 -right-4 shadow">
                      {cart.length}
                    </span>
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={i}
                to={link.to}
                className={`hover:text-pink-600 dark:hover:text-pink-400 transition ${location.pathname === link.to ? 'font-bold' : ''}`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Botón logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-2 text-sm bg-pink-600 dark:bg-pink-700 text-white px-4 py-1.5 rounded-full hover:bg-pink-700 dark:hover:bg-pink-800 shadow transition"
              aria-label="Cerrar sesión"
            >
              Salir
            </button>
          )}

          {/* Toggle dark mode */}
          <button
            onClick={() => setDark(d => !d)}
            className="ml-3 flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:scale-105 transition"
            aria-label="Cambiar modo"
          >
            {dark ? (
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

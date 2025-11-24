const links = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/#productos" },
  { name: "Categorías", href: "/#" },
  { name: "Contacto", href: "/#" },
  { name: "Ayuda", href: "/#" },
];

const policies = [
  { name: "Términos", href: "/#" },
  { name: "Privacidad", href: "/#" },
  { name: "Devoluciones", href: "/#" },
];

const rrss = [
  { name: "Instagram", href: "https://instagram.com", icon: "📸" },
  { name: "Facebook", href: "https://facebook.com", icon: "📘" },
  { name: "WhatsApp", href: "https://wa.me/5215555555555", icon: "💬" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">Las AA Store</span>
          <p className="footer-desc">
            Tu tienda premium de tecnología, hogar y belleza.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Enlaces</h4>
          <ul className="footer-list">
            {links.map((l) => (
              <li key={l.name}>
                <a href={l.href}>{l.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Políticas</h4>
          <ul className="footer-list">
            {policies.map((l) => (
              <li key={l.name}>
                <a href={l.href}>{l.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Newsletter</h4>
          <form className="footer-newsletter">
            <input type="email" placeholder="Tu email" />
            <button type="submit">Suscribirme</button>
          </form>

          <div className="footer-social">
            {rrss.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.name}
              >
                {r.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Las AA Store. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

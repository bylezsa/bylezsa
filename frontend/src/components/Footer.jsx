const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/#productos' },
  { name: 'Categorías', href: '/#' },
  { name: 'Contacto', href: '/#' },
  { name: 'Ayuda', href: '/#' },
];
const policies = [
  { name: 'Términos', href: '/#' },
  { name: 'Privacidad', href: '/#' },
  { name: 'Devoluciones', href: '/#' },
];
const rrss = [
  { name: 'Instagram', href: 'https://instagram.com', icon: '📸' },
  { name: 'Facebook', href: 'https://facebook.com', icon: '📘' },
  { name: 'WhatsApp', href: 'https://wa.me/5215555555555', icon: '💬' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10 pt-10 pb-4 px-4 text-gray-700 dark:text-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <span className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">Las AA Store</span>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">Tu tienda premium de tecnología, hogar y belleza.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-pink-600 dark:text-pink-400">Enlaces</h4>
          <ul className="space-y-1">
            {links.map(link => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-pink-600 dark:hover:text-pink-300 transition">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-pink-600 dark:text-pink-400">Políticas</h4>
          <ul className="space-y-1">
            {policies.map(link => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-pink-600 dark:hover:text-pink-300 transition">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-pink-600 dark:text-pink-400">Newsletter</h4>
          <form className="flex flex-col gap-2">
            <input type="email" placeholder="Tu email" className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-400 transition" />
            <button type="submit" className="bg-pink-600 dark:bg-pink-700 text-white rounded py-2 font-semibold hover:bg-pink-700 dark:hover:bg-pink-800 transition">Suscribirme</button>
          </form>
          <div className="flex gap-3 mt-4">
            {rrss.map(r => (
              <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition" aria-label={r.name}>{r.icon}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-4">&copy; {new Date().getFullYear()} Las AA Store. Todos los derechos reservados.</div>
    </footer>
  );
}

const items = [
  {
    icon: '🛡️',
    title: 'Compra segura',
    desc: 'Tus datos y pagos están protegidos.'
  },
  {
    icon: '↩️',
    title: 'Devolución garantizada',
    desc: 'Hasta 30 días para cambios o devoluciones.'
  },
  {
    icon: '💳',
    title: 'Pagos flexibles',
    desc: 'Aceptamos tarjetas, transferencias y más.'
  },
  {
    icon: '🚚',
    title: 'Envío rápido',
    desc: 'Recibe tu pedido en 24-72h.'
  },
];

export default function TrustBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-8 mb-6">
      <div className="flex flex-wrap justify-center md:justify-between gap-4 bg-white/80 rounded-2xl shadow border border-pink-100 py-3 px-2 md:px-6 animate-fadein">
        {items.map(item => (
          <div key={item.title} className="flex items-center gap-3 min-w-[180px]">
            <span className="text-2xl md:text-3xl">{item.icon}</span>
            <div>
              <div className="font-bold text-pink-600 text-sm md:text-base">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

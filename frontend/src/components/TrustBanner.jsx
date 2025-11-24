import '../styles/trustbanner.css';

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
    <div className="trust-container">
      <div className="trust-banner">
        {items.map(item => (
          <div key={item.title} className="trust-item">
            <span className="trust-icon">{item.icon}</span>
            <div>
              <div className="trust-title">{item.title}</div>
              <div className="trust-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

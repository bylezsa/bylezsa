import "../styles/InspirationGrid.css";

const inspiration = [
  {
    title: "Ropa y Moda",
    image: "/inspo-1.jpg",
    link: "#productos",
  },
  {
    title: "Aseo del Hogar",
    image: "/inspo-2.jpg",
    link: "#productos",
  },
  {
    title: "Cuidado Personal",
    image: "/inspo-3.jpg",
    link: "#productos",
  },
  {
    title: "Tecnología y Gadgets",
    image: "/inspo-4.jpg",
    link: "#productos",
  },
  {
    title: "Ofertas del Día",
    image: "/inspo-5.jpg",
    link: "#productos",
  },
];

export default function InspirationGrid() {
  return (
    <section className="inspo-section">
      <h2 className="inspo-title">
        <span className="sparkle">✨</span> Inspiración para ti
      </h2>

      <div className="inspo-grid">
        {inspiration.map((item, i) => (
          <a
            key={item.title}
            href={item.link}
            className="inspo-card"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <img src={item.image} alt={item.title} className="inspo-img" />

            <div className="inspo-label">{item.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

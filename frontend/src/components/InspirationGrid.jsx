const inspiration = [
  {
    title: 'Nuevas colecciones',
    image: '/inspo-1.jpg',
    link: '#productos',
    color: 'from-pink-100 to-pink-50',
  },
  {
    title: 'Para tu hogar',
    image: '/inspo-2.jpg',
    link: '#productos',
    color: 'from-yellow-100 to-white',
  },
  {
    title: 'Belleza y cuidado',
    image: '/inspo-3.jpg',
    link: '#productos',
    color: 'from-fuchsia-100 to-white',
  },
  {
    title: 'Tecnología',
    image: '/inspo-4.jpg',
    link: '#productos',
    color: 'from-blue-100 to-white',
  },
  {
    title: 'Ofertas exclusivas',
    image: '/inspo-5.jpg',
    link: '#productos',
    color: 'from-green-100 to-white',
  },
];

export default function InspirationGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-2 md:px-8 mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-pink-400 text-2xl">✨</span> Inspiración para ti
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {inspiration.map((item, i) => (
          <a
            key={item.title}
            href={item.link}
            className={`group rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${item.color} relative flex flex-col justify-end min-h-[180px] h-48 md:h-56 transition-transform duration-300 hover:scale-105 animate-fadein`}
            style={{ animationDelay: `${0.1 + 0.05 * i}s` }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition duration-300"
              loading="lazy"
            />
            <div className="relative z-10 p-4">
              <span className="inline-block bg-white/80 text-pink-600 font-bold text-base md:text-lg px-3 py-1 rounded-full shadow group-hover:bg-pink-600 group-hover:text-white transition">
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

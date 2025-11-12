export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-10 md:py-16 px-2 md:px-8 mb-10">
      <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Descubre tu <span className="text-pink-600">belleza</span> y bienestar
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
          Productos premium para el hogar, cuidado personal y mucho más. Vive la experiencia Las AA Store.
        </p>
        <a href="#productos" className="inline-block px-8 py-3 bg-pink-600 text-white rounded-full font-semibold text-lg shadow hover:bg-pink-700 transition">
          Ver productos
        </a>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img
          src="/hero-premium.png"
          alt="Hero Las AA Store"
          className="w-full max-w-xs md:max-w-md rounded-2xl shadow-lg border border-pink-100"
          style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fff 100%)' }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none select-none opacity-0 translate-y-8 animate-fadein">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full blur-2xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200 rounded-full blur-2xl opacity-50 animate-pulse" />
      </div>
    </section>
  );
}

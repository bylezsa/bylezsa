export default function PromoBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-600 via-pink-400 to-pink-600 text-white text-sm md:text-base font-semibold py-2 px-4 flex items-center justify-center gap-2 animate-fadein z-50 shadow">
      <span className="inline-block animate-bounce">🚚</span>
      ¡Envío gratis en compras superiores a $999! | 3 y 6 MSI con tarjetas participantes
      <span className="hidden md:inline ml-4">🎁 Descubre nuestras ofertas exclusivas de temporada</span>
    </div>
  );
}

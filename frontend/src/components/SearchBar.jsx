export default function SearchBar({ search, onSearch, showFavs, toggleFavs }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={e => onSearch(e.target.value)}
        className="px-4 py-2 border rounded w-full max-w-md"
      />
      <button
        className={`flex items-center gap-1 px-4 py-2 rounded-full border transition text-sm font-semibold ${showFavs ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-pink-600 border-pink-200 hover:bg-pink-50'}`}
        onClick={toggleFavs}
      >
        <svg className={`w-5 h-5 ${showFavs ? 'fill-white' : 'fill-none'} stroke-current`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
        </svg>
        {showFavs ? 'Favoritos' : 'Ver favoritos'}
      </button>
    </div>
  );
}

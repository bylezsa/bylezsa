import '../styles/searchbar.css';

export default function SearchBar({ search, onSearch, showFavs, toggleFavs }) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={e => onSearch(e.target.value)}
        className="searchbar-input"
      />

      <button
        className={`favs-btn ${showFavs ? 'active' : ''}`}
        onClick={toggleFavs}
      >
        <svg
          className={`heart-icon ${showFavs ? 'filled' : ''}`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5
             4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5
             4.5 0 010-6.364z"
          />
        </svg>
        {showFavs ? 'Favoritos' : 'Ver favoritos'}
      </button>
    </div>
  );
}

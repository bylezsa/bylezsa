export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className={`px-3 py-1 rounded ${!selected ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        onClick={() => onSelect('')}
      >
        Todas
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`px-3 py-1 rounded ${selected === cat.id ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

import { useState } from 'react';

const mockReviews = [
  {
    name: 'Ana G.',
    rating: 5,
    comment: '¡Me encantó el producto! Llegó rápido y la calidad es excelente.',
    date: '2025-09-10',
  },
  {
    name: 'Carlos M.',
    rating: 4,
    comment: 'Muy buen servicio y atención. Volveré a comprar.',
    date: '2025-09-05',
  },
];

function StarRating({ value }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-5 h-5 ${i <= value ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
      ))}
    </span>
  );
}

export default function ProductReviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleRating = r => {
    setForm(f => ({ ...f, rating: r }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.comment) {
      setError('Completa todos los campos y selecciona una calificación.');
      return;
    }
    setReviews([{ ...form, date: new Date().toISOString().slice(0,10) }, ...reviews]);
    setForm({ name: '', rating: 0, comment: '' });
    setSuccess('¡Gracias por tu review!');
  };

  return (
    <section className="mt-10">
      <h3 className="text-xl font-bold mb-4 text-pink-600">Opiniones de clientes</h3>
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col gap-3 max-w-lg">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Tu calificación:</span>
          {[1,2,3,4,5].map(i => (
            <button type="button" key={i} onClick={() => handleRating(i)} className="focus:outline-none">
              <svg className={`w-6 h-6 ${i <= form.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
            </button>
          ))}
        </div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="¿Qué te pareció el producto?" className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[60px]" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="bg-pink-600 dark:bg-pink-700 text-white rounded py-2 font-semibold hover:bg-pink-700 dark:hover:bg-pink-800 transition">Enviar review</button>
      </form>
      <div className="space-y-6">
        {reviews.length === 0 && <div className="text-gray-500">Aún no hay opiniones para este producto.</div>}
        {reviews.map((r, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-800 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-lg">
                {r.name[0]}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{r.name}</div>
                <div className="text-xs text-gray-400">{r.date}</div>
                <StarRating value={r.rating} />
              </div>
            </div>
            <div className="flex-1 text-gray-700 dark:text-gray-200">{r.comment}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

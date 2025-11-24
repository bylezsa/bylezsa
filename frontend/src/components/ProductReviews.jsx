import { useState } from 'react';
import '../styles/reviews.css';

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
    <span className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={`star ${i <= value ? 'star-filled' : ''}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
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
    setReviews([{ ...form, date: new Date().toISOString().slice(0, 10) }, ...reviews]);
    setForm({ name: '', rating: 0, comment: '' });
    setSuccess('¡Gracias por tu review!');
  };

  return (
    <section className="reviews-section">
      <h3 className="reviews-title">Opiniones de clientes</h3>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="rating-block">
          <span className="label">Tu calificación:</span>
          {[1, 2, 3, 4, 5].map(i => (
            <button
              type="button"
              key={i}
              onClick={() => handleRating(i)}
              className="star-button"
            >
              <svg
                className={`star star-big ${i <= form.rating ? 'star-filled' : ''}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            </button>
          ))}
        </div>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          className="input"
        />

        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="¿Qué te pareció el producto?"
          className="textarea"
        />

        {error && <div className="msg-error">{error}</div>}
        {success && <div className="msg-success">{success}</div>}

        <button type="submit" className="btn-submit">Enviar review</button>
      </form>

      <div className="reviews-list">
        {reviews.length === 0 && (
          <div className="no-reviews">Aún no hay opiniones para este producto.</div>
        )}

        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <div className="avatar">{r.name[0]}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-date">{r.date}</div>
                <StarRating value={r.rating} />
              </div>
            </div>
            <p className="review-comment">{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWishlist } from '../context/WishlistContext';
import "../styles/ProductCard.css";

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wish = isInWishlist(product.id);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart(product);

    toast.success("Producto añadido al carrito", { icon: "🛒" });

    setTimeout(() => setAdded(false), 900);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    wish ? removeFromWishlist(product.id) : addToWishlist(product.id);
  };

  return (
    <div className="pcard">
      <div className="pcard-img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image_url || "/vite.svg"}
            alt={product.name}
            className="pcard-img"
          />
        </Link>

        <button className={`pcard-wish ${wish ? "active" : ""}`} onClick={toggleWishlist}>
          <svg viewBox="0 0 24 24">
            <path
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 
              7.636l1.318-1.318a4.5 4.5 0 116.364 
              6.364L12 21.364l-7.682-7.682a4.5 
              4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      <div className="pcard-info">
        <h3>{product.name}</h3>
        <p className="pcard-desc">{product.description}</p>

        <div className="pcard-footer">
          <span className="pcard-price">${product.price}</span>

          {onAddToCart && (
            <button
              onClick={handleAdd}
              className={`pcard-add ${added ? "added" : ""}`}
            >
              {added ? "✓ Añadido" : "Añadir"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;

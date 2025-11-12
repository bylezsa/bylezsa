import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((id) => {
    setWishlist((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter(pid => pid !== id));
  }, []);

  const isInWishlist = useCallback((id) => wishlist.includes(id), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

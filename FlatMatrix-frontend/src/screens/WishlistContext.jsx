// WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (property) => {
    setWishlist((prevWishlist) => [...prevWishlist, property]);
  };

  const removeFromWishlist = (propertyId) => {
    setWishlist((prevWishlist) => prevWishlist.filter(property => property.id !== propertyId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

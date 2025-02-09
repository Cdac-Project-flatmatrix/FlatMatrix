// Wishlist.jsx
import React from "react";
import "../styles/Wishlist.css";
import { useWishlist } from "./WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-container-wrapper">
      <div className="wishlist-container">
        <h2>Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>No properties in the wishlist.</p>
        ) : (
          <ul className="wishlist-list">
            {wishlist.map((property, index) => (
              <li key={property.id} className="wishlist-item">
                <span className="wishlist-item-number">{index + 1}</span>
                <div className="wishlist-item-content">
                  <img
                    src={property.photos[0]}
                    alt={property.description}
                    className="wishlist-item-image"
                  />
                  <div className="wishlist-item-details">
                    <h4>{property.description}</h4>
                    <p>Price: ₹{property.price}</p>
                    <p>Address: {property.address.street}, {property.address.city}, {property.address.state}, {property.address.country} - {property.address.pinCode}</p>
                    <div className="button-container row">
                      <div className="col d-flex gap-3">
                        <div className="">
                          <Link
                            to="/propertyDetails"
                            className="btn btn-info m-2 silent-btn"
                          >
                            Get Details
                          </Link>
                        </div>
                        <div className="">
                          <button
                            className="btn btn-info m-2 silent-btn"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => removeFromWishlist(property.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

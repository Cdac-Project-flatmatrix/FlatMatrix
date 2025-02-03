import React from "react";
import "../styles/Wishlist.css";
import image from "../screens/image.jpg";
import image1 from "../screens/image1.jpeg";
import image2 from "../screens/image2.jpeg";
import image3 from "../screens/image3.jpeg";
import { Link } from "react-router-dom";

function Wishlist() {
  const properties = [
    {
      id: 1,
      name: "Sunset Villa",
      rate: "$500,000",
      address: "123 Sunset Blvd, Pune",
      image: image,
    },
    {
      id: 2,
      name: "Urban Heights",
      rate: "$350,000",
      address: "456 Urban Rd, Mumbai",
      image: image1,
    },
    {
      id: 3,
      name: "Urban Heights",
      rate: "$350,000",
      address: "456 Urban Rd, Mumbai",
      image: image2,
    },
    {
      id: 4,
      name: "Urban Heights",
      rate: "$350,000",
      address: "456 Urban Rd, Mumbai",
      image: image3,
    },
  ];

  return (
    <div className="wishlist-container-wrapper">
      <div className="wishlist-container">
        <h2>Your Wishlist</h2>
        <ul className="wishlist-list">
          {properties.map((property, index) => (
            <li key={property.id} className="wishlist-item">
              <span className="wishlist-item-number">{index + 1}</span>
              <div className="wishlist-item-content">
                <img
                  src={property.image}
                  alt={property.name}
                  className="wishlist-item-image"
                />
                <div className="wishlist-item-details">
                  <h4>{property.name}</h4>
                  <p>Price: {property.rate}</p>
                  <p>Address: {property.address}</p>
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
                        <Link
                          to="/property-update"
                          className="btn btn-info m-2 silent-btn"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Remove
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;

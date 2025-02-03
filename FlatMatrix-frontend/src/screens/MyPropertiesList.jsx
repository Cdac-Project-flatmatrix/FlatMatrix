import React from "react";
import "../styles/Wishlist.css";
import { Link } from "react-router-dom";

function MyPropertyList() {
  const properties = [
    {
      id: 1,
      name: "Sunset Villa",
      rate: "$500,000",
      address: "123 Sunset Blvd, Pune",
      image: "property_image.jpg",
    },
    {
      id: 2,
      name: "Urban Heights",
      rate: "$350,000",
      address: "456 Urban Rd, Mumbai",
      image: "property_image.jpg",
    },
    {
      id: 3,
      name: "Urban Heights",
      rate: "$350,000",
      address: "456 Urban Rd, Mumbai",
      image: "property_image.jpg",
    },
    {
      id: 4,
      name: "Urban Heights",
      rate: "$350,000",
      address: "456 Urban Rd, Mumbai",
      image: "property_image.jpg",
    },
  ];

  return (
    <div className="">
      <div className="wishlist-container">
        <h2 className="m-2">Properties</h2>
        <ul className="wishlist-list m-2">
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
                  <h4 className="text-white">{property.name}</h4>
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
                          Update
                        </Link>
                      </div>
                      <div className="">
                        <Link
                          to=""
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

export default MyPropertyList;

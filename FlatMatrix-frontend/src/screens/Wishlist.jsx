import React, { useEffect, useState } from "react";
import "../styles/Wishlist.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getWishlist, removeWishlist } from "../services/property";

function Wishlist() {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();

  const onLoad = async () => {
    try {
      const response = await getWishlist();
      if (response.status === 200) {
        setProperties(response.data);
        console.log(response.data);
      }
    } catch (error) {
      alert("Error while fetching data");
      setProperties([]);
    }
  };

  const propertiesDetail = (property) => {
    console.log(property);
    navigation("/propertyDetails", { state: property });
  };
  useEffect(() => {
    onLoad();
  }, [location.state]);

  const onRemove = async (id) => {
    const response = await removeWishlist(id);
    if (response.status === 200) {
      alert("property removed from wishlist");
      setProperties((prevProperties) =>
        prevProperties.filter((p) => p.id !== id)
      );
    }
  };

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
                  src={property.photos[0].imageUrl}
                  alt={property.name}
                  className="wishlist-item-image"
                />
                <div className="wishlist-item-details">
                  <h4>{property.name}</h4>
                  <p>Price: {property.price}</p>
                  <p>Address: {property.address.city}</p>
                  <div className="button-container row">
                    <div className="col d-flex gap-3">
                      <div className="">
                        {/* <Link
                          to="/propertyDetails"
                          className="btn btn-info m-2 silent-btn"
                        >
                          Get Details
                        </Link> */}
                        <button
                          className="btn btn-info m-2 silent-btn"
                          onClick={() => propertiesDetail(property)}
                        >
                          Get Details
                        </button>
                      </div>
                      {/* <div className="">
                        <Link
                          to="/property-update"
                          className="btn btn-info m-2 silent-btn"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Remove
                        </Link> */}
                      <div className="">
                        <button
                          className="btn btn-info m-2 silent-btn"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => onRemove(property.id)}
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
      </div>
    </div>
  );
}

export default Wishlist;

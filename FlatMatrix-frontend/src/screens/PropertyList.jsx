import React, { useEffect, useState } from "react";
import "../styles/Wishlist.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../services/property";
import { toast } from "react-toastify";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const onLoad = async () => {
    try {
      const response = await getProperties(location.state);
      if (response.status === 200) {
        
        setProperties(response.data);
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Error while fetching data");
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

  return (
    <div className="wishlist-container-wrapper">
      <div className="wishlist-container">
        <h2 className="m-2">Properties</h2>
        <ul className="wishlist-list m-2">
          {Array.isArray(properties) && properties.length > 0 ? (
            properties.map((property, index) => (
              <li key={index} className="wishlist-item">
                <span className="wishlist-item-number">{index + 1}</span>
                <div className="wishlist-item-content">
                  <img
                    src={property.photos[0].imageUrl}
                    alt={property.address.street}
                    className="wishlist-item-image"
                  />
                  <div className="wishlist-item-details">
                    <h4 className="text-white">{property.address.street}</h4>
                    <p>Price: {property.price}</p>
                    <p>
                      Address: {property.address.street},{" "}
                      {property.address.city}
                    </p>
                    <div className="button-container row">
                      <div className="col d-flex gap-3">
                        <div className="">
                          <button
                            onClick={() => propertiesDetail(property)}
                            className="btn btn-info m-2 silent-btn"
                          >
                            Get Details
                          </button>
                        </div>
                        <div className="">
                          <button className="btn action-btn">
                            Add to wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-white">No properties available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PropertyList;

import React, { useState } from "react";
import "../styles/PropertyDetails.css";
import { useLocation } from "react-router-dom";

const MyPropertyDetails = () => {

  const location = useLocation();
  const propertyData = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < propertyData.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(propertyData.photos.length - 1);
    }
  };
  console.log(propertyData);
  return (
    <div className="update-container-wrapper">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="property-container">
            <div className="image-slider-container">
              <div className="image-slider">
                <img
                  style={{ width: "100%", height: "300px" }}
                  src={propertyData.photos[currentImageIndex].imageUrl}
                  alt="Property"
                />
              </div>

              <div className="nav-arrows">
                <button className="arrow left" onClick={prevImage}>
                  &lt;
                </button>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <button className="arrow right" onClick={nextImage}>
                  &gt;
                </button>
              </div>
            </div>

            <div className="card">
              <h2>Property Details</h2>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>
                    <strong>Price:</strong> ₹{propertyData.price}
                  </p>
                  <p>
                    <strong>Size:</strong> {propertyData.size} sq.ft.
                  </p>
                  <p>
                    <strong>Bedrooms:</strong> {propertyData.bedRooms}
                  </p>
                  <p>
                    <strong>Type:</strong> {propertyData.type}
                  </p>
                  <p>
                    <strong>Status:</strong> {propertyData.status}
                  </p>
                  <p>
                    <strong>Furnished:</strong> {propertyData.furnished}
                  </p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  <p>
                    <strong>Description:</strong> {propertyData.description}
                  </p>
                  <p>
                    <strong>For Rent:</strong>{" "}
                    {propertyData.forRent ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Address</h2>
              <p>
                <strong>Street:</strong> {propertyData.address.street}
              </p>
              <p>
                <strong>City:</strong> {propertyData.address.city}
              </p>
              <p>
                <strong>State:</strong> {propertyData.address.state}
              </p>
              <p>
                <strong>Country:</strong> {propertyData.address.country}
              </p>
              <p>
                <strong>Pin Code:</strong> {propertyData.address.pinCode}
              </p>
            </div>

            {/* <div className="card property-details-button-wrapper">
              <div className="row">
                <div className="col d-flex gap-3">
                  <button className="btn btn-outline-dark h-100 py-2 silent-btn">
                    Add to Wishlist
                  </button>
                  <button className="btn btn-outline-dark h-100 py-2 silent-btn">
                    Contact Owner
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default MyPropertyDetails;

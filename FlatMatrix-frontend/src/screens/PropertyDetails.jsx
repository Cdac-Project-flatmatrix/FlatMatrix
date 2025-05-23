import React, { useState } from "react";
import "../styles/PropertyDetails.css";
import { useLocation } from "react-router-dom";
import { addTowishlist } from "../services/property";
import EnquiryForm from "./EnquiryForm";

const PropertyDetails = () => {
  // const propertyData = {
  //   address: {
  //     street: "123 Main St",
  //     city: "Pune",
  //     state: "Maharashtra",
  //     country: "India",
  //     pinCode: 411057,
  //   },
  //   price: 5000000,
  //   size: 1500,
  //   bedRooms: 3,
  //   type: "READY",
  //   status: "AVAILABLE",
  //   furnished: "SEMI_FURNISHED",
  //   description: "Spacious 3BHK with modern amenities.",
  //   forRent: false,
  //   photos: [Image1, Image2, Image3],
  // };
  const location = useLocation();
  const propertyData = location.state || {};
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < propertyData.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  const [mesg, setMesg] = useState("");
  const onAdd = async (id) => {
    console.log(id);
    const response = await addTowishlist(id);
    if (response.status === 200) {
      setMesg(response.data);
      alert(response.data);
    } else {
      alert("failed to add");
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
                    <strong>Price:</strong> ₹{propertyData.id}
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

            <div className="card property-details-button-wrapper">
              <div className="row">
                <div className="col d-flex gap-3">
                  {mesg === "Property added to wishlist successfully." ||
                  mesg === "Property is already in wishlist." ? (
                    <button
                      onClick={() => onAdd(propertyData.id)}
                      className="btn btn-outline-dark h-100 py-2 silent-btn"
                    >
                      Added
                    </button>
                  ) : (
                    <button
                      onClick={() => onAdd(propertyData.id)}
                      className="btn btn-outline-dark h-100 py-2 silent-btn"
                    >
                      Add to Wishlist
                    </button>
                  )}
                  <button
                    className="btn btn-outline-dark h-100 py-2 silent-btn"
                    onClick={() => setShowEnquiryForm(true)}
                  >
                    Contact Owner
                  </button>

                  {/* Show Enquiry Form Modal */}
                  {showEnquiryForm && (
                    <EnquiryForm
                      propertyId={propertyData.id}
                      onClose={() => setShowEnquiryForm(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default PropertyDetails;

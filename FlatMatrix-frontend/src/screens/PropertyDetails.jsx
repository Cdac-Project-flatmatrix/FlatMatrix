import React, { useState } from "react";
import "../styles/PropertyDetails.css";
import Image1 from '../screens/image.jpg';
import Image2 from '../screens/image2.jpeg';
import Image3 from '../screens/image3.jpeg';
import { addToWishlist, contactOwner } from "../services/propertydetails"; // Import Axios functions

const PropertyDetails = () => {
  const propertyData = {
    id: 101, // Property ID for API reference
    address: {
      street: "123 Main St",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pinCode: 411057,
    },
    price: 5000000,
    size: 1500,
    bedRooms: 3,
    type: "READY",
    status: "AVAILABLE",
    furnished: "SEMI_FURNISHED",
    description: "Spacious 3BHK with modern amenities.",
    forRent: false,
    photos: [Image1, Image2, Image3],
    ownerId: 501 // Assuming owner ID is needed to contact them
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState(""); // For displaying feedback messages

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % propertyData.photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + propertyData.photos.length) % propertyData.photos.length);
  };

  // Handler for Add to Wishlist
  const handleAddToWishlist = async () => {
    const response = await addToWishlist(propertyData.id);
    if (response.status === "success") {
      setMessage("Property added to wishlist!");
    } else {
      setMessage("Failed to add to wishlist. Please try again.");
    }
  };

  // Handler for Contact Owner
  const handleContactOwner = async () => {
    const response = await contactOwner(propertyData.ownerId);
    if (response.status === "success") {
      setMessage("Owner has been contacted successfully!");
    } else {
      setMessage("Failed to contact owner. Please try again.");
    }
  };

  return (
    <div className="update-container-wrapper">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="property-container">
            <div className="image-slider-container">
              <div className="image-slider">
                <img src={propertyData.photos[currentImageIndex]} alt="Property" />
              </div>

              <div className="nav-arrows">
                <button className="arrow left" onClick={prevImage}>&lt;</button>
                <button className="arrow right" onClick={nextImage}>&gt;</button>
              </div>
            </div>

            <div className="card">
              <h2>Property Details</h2>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p><strong>Price:</strong> ₹{propertyData.price}</p>
                  <p><strong>Size:</strong> {propertyData.size} sq.ft.</p>
                  <p><strong>Bedrooms:</strong> {propertyData.bedRooms}</p>
                  <p><strong>Type:</strong> {propertyData.type}</p>
                  <p><strong>Status:</strong> {propertyData.status}</p>
                  <p><strong>Furnished:</strong> {propertyData.furnished}</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  <p><strong>Description:</strong> {propertyData.description}</p>
                  <p><strong>For Rent:</strong> {propertyData.forRent ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Address</h2>
              <p><strong>Street:</strong> {propertyData.address.street}</p>
              <p><strong>City:</strong> {propertyData.address.city}</p>
              <p><strong>State:</strong> {propertyData.address.state}</p>
              <p><strong>Country:</strong> {propertyData.address.country}</p>
              <p><strong>Pin Code:</strong> {propertyData.address.pinCode}</p>
            </div>

            <div className="card property-details-button-wrapper">
              <div className="row">
                <div className="col d-flex gap-3">
                  <button className="btn btn-outline-dark h-100 py-2 silent-btn" onClick={handleAddToWishlist}>
                    Add to Wishlist
                  </button>
                  <button className="btn btn-outline-dark h-100 py-2 silent-btn" onClick={handleContactOwner}>
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>

            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default PropertyDetails;

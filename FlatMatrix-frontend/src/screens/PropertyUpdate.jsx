import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/PropertyUpdate.css";
import { Link, useNavigate } from "react-router-dom";
import { updateProperty } from "../services/propertyupdate"; // Import the axios function

const PropertyUpdate = () => {
  const navigate = useNavigate(); // To redirect after successful update
  const [property, setProperty] = useState({
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
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "country", "pinCode"].includes(name)) {
      setProperty((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setProperty((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onDrop = (acceptedFiles) => {
    setProperty({ ...property, photo: acceptedFiles[0] }); // Store file object for uploading
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API (you may need to adjust according to backend expectations)
    const propertyData = {
      ...property,
      photo: property.photo, // Include file if the backend supports it
    };

    try {
      const propertyId = "123"; // Replace with dynamic ID if available
      const response = await updateProperty(propertyId, propertyData);

      if (response.status !== "error") {
        alert("Property updated successfully!");
        navigate("/my-properties");
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("An error occurred while updating the property.");
    }
  };

  return (
    <div className="update-container-wrapper">
      <div className="update-container">
        <h2>Update Property Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="half-width">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={property.address.street}
              onChange={handleChange}
            />
          </div>

          <div className="half-width">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={property.address.city}
              onChange={handleChange}
            />
          </div>

          <div className="half-width">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={property.price}
              onChange={handleChange}
            />
          </div>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>

          {property.photo && (
            <div className="image-preview">
              <img src={URL.createObjectURL(property.photo)} alt="Property" />
            </div>
          )}

          <button type="submit" className="btn btn-light buy-btn mb-5" style={{ width: "100%" }}>
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyUpdate;


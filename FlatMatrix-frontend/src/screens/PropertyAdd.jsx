import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/PropertyUpdate.css"; 
import { Link } from "react-router-dom";

const PropertyAdd = () => {
  const [property, setProperty] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
    price: "",
    size: "",
    bedRooms: "",
    type: "READY",
    status: "AVAILABLE",
    furnished: "SEMI_FURNISHED",
    description: "",
    forRent: false,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };


  const onDrop = (acceptedFiles) => {
    setProperty({ ...property, photo: URL.createObjectURL(acceptedFiles[0]) });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Added:", property);
    alert("Property added successfully!");
  };

  return (
    <div className="update-container-wrapper">
      <div className="update-container">
        <h2>Add Property Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="half-width">
            <label>Street</label>
            <input type="text" name="street" onChange={handleChange} />
          </div>
          <div className="half-width">
            <label>City</label>
            <input type="text" name="city" onChange={handleChange} />
          </div>
          <div className="half-width">
            <label>Price ($)</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
          <div className="half-width">
            <label>Size (sq. ft.)</label>
            <input type="number" name="size" onChange={handleChange} />
          </div>

          <div className="half-width">
            <label>Bedrooms</label>
            <input type="number" name="bedRooms" onChange={handleChange} />
          </div>
          <div className="half-width">
            <label>Type</label>
            <select name="type" value={property.type} onChange={handleChange}>
              <option value="READY">Ready</option>
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
              <option value="RESALE">Resale</option>
            </select>
          </div>

          <div className="half-width">
            <label>Status</label>
            <select
              name="status"
              value={property.status}
              onChange={handleChange}
            >
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
              <option value="BOOKED">Booked</option>
            </select>
          </div>
          <div className="half-width">
            <label>Furnished</label>
            <select
              name="furnished"
              value={property.furnished}
              onChange={handleChange}
            >
              <option value="NOT_FURNISHED">Not Furnished</option>
              <option value="SEMI_FURNISHED">Semi Furnished</option>
              <option value="FULLY_FURNISHED">Fully Furnished</option>
            </select>
          </div>

          <div className="half-width">
            <label>Description</label>
            <textarea name="description" onChange={handleChange}></textarea>
          </div>

          <div className="half-width">
            <label>For Rent</label>
            <select
              name="forRent"
              value={property.forRent}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>

          {property.photo && (
            <div className="image-preview">
              <img src={property.photo} alt="Property" />
            </div>
          )}

          <Link
                      to="/my-properties"
                      className="btn btn-light buy-btn mb-5"
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      Add Property
                    </Link>
        </form>
      </div>
    </div>
  );
};

export default PropertyAdd;

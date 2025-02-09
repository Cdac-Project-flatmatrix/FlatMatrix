import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app"; 
import { addProperty } from "../services/property";
import "../styles/PropertyUpdate.css";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvC0ke626sZeoMVNhpPgfOtUDgEaLtBYI",
  authDomain: "flatmatrix-e74aa.firebaseapp.com",
  projectId: "flatmatrix-e74aa",
  storageBucket: "gs://flatmatrix-e74aa.firebasestorage.app",
  messagingSenderId: "1043221700548",
  appId: "1:1043221700548:web:362c547314ce1a84bcce91",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const PropertyAdd = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    price: "",
    size: "",
    bedRooms: "",
    type: "READY",
    status: "AVAILABLE",
    furnished: "SEMI_FURNISHED",
    description: "",
    forRent: false,
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
    photos: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle input changes for normal & nested fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["street", "city", "state", "country", "pinCode"].includes(name)) {
      setProperty((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else if (type === "checkbox") {
      setProperty((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProperty((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle multiple image uploads
  const onDrop = (acceptedFiles) => {
    setImageFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop,
  });

  const uploadImagesToFirebase = async () => {
    if (!imageFiles.length) return [];

    setUploading(true);
    const uploadPromises = imageFiles.map(async (file) => {
      const storageRef = ref(storage, `property_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ photoUrl: downloadURL }); // Store only the photoUrl
          }
        );
      });
    });

    try {
      const uploadedPhotos = await Promise.all(uploadPromises);
      setUploading(false);
      return uploadedPhotos;
    } catch (error) {
      console.error("Image upload error:", error);
      setUploading(false);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedPhotos = await uploadImagesToFirebase();
      if (!uploadedPhotos.length) throw new Error("Image upload failed!");

      const propertyData = { ...property, photos: uploadedPhotos }; // Ensuring photos only contain { photoUrl }
      const response = await addProperty(propertyData);
      console.log(response);
      if (response.message == "Success") {
        alert("Property added successfully!");
        navigate("/my-properties");
      } else {
        throw new Error(response.message || "Property addition failed.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="update-container-wrapper">
      <div className="update-container">
        <h2>Add Property Details</h2>
        <form onSubmit={handleSubmit} className="scrollable-form">
          {/* Property Details */}
          <div className="half-width">
            <input type="number" name="price" placeholder="Price ($)" onChange={handleChange} />
          </div>
          <div className="half-width">
            <input type="number" name="size" placeholder="Size (sq. ft.)" onChange={handleChange} />
          </div>
          <div className="half-width">
            <input type="number" name="bedRooms" placeholder="Bedrooms" onChange={handleChange} />
          </div>
          <div className="half-width">
            <select name="type" onChange={handleChange} value={property.type}>
              <option value="READY">Ready</option>
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
            </select>
          </div>
          <div className="half-width">
            <select name="status" onChange={handleChange} value={property.status}>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
          <div className="half-width">
            <select name="furnished" onChange={handleChange} value={property.furnished}>
              <option value="SEMI_FURNISHED">Semi-Furnished</option>
              <option value="FULLY_FURNISHED">Fully Furnished</option>
              <option value="UNFURNISHED">Unfurnished</option>
            </select>
          </div>

          {/* Address Fields */}
          <div className="half-width">
            <input type="text" name="street" placeholder="Street" onChange={handleChange} />
          </div>
          <div className="half-width">
            <input type="text" name="city" placeholder="City" onChange={handleChange} />
          </div>
          <div className="half-width">
            <input type="text" name="state" placeholder="State" onChange={handleChange} />
          </div>
          <div className="half-width">
            <input type="text" name="country" placeholder="Country" onChange={handleChange} />
          </div>
          <div className="half-width">
            <input type="text" name="pinCode" placeholder="Pin Code" onChange={handleChange} />
          </div>

          <div className="full-width">
            <textarea 
              name="description" 
              placeholder="Description" 
              onChange={handleChange} 
              rows="4" 
              cols="30"
              style={{ width: "100%", height: "100px", resize: "vertical" }} 
            />
          </div>

          <div className="full-width">
            <label style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", gap: "5px" }}>
              <input type="checkbox" name="forRent" checked={property.forRent} onChange={handleChange} />
              For Rent?
            </label>
          </div>

          {/* File Upload */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop images here, or click to select multiple images</p>
          </div>

          {/* Image Previews */}
          {imageFiles.length > 0 && (
            <div className="image-preview-container">
              {imageFiles.map((file, index) => (
                <div key={index} className="image-preview">
                  <img src={URL.createObjectURL(file)} alt={`Property ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyAdd;

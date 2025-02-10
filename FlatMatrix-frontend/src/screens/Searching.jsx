import React, { useState } from "react";
import axios from "axios";
import { createUrl } from "../utils";
import "../styles/Searching.css";
import { updateProperty } from "../services/propertyupdate"; 

function Searching() {
  const [selectedCategory, setSelectedCategory] = useState("rent");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");
  const [selectedFurniture, setSelectedFurniture] = useState("");
  const [furnitureDisabled, setFurnitureDisabled] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFurnitureDisabled(false);
    setSelectedType("");
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFurnitureDisabled(type === "under-construction");
  };

  const handleSearch = async () => {
    try {
      const url = createUrl("properties/search");
      const body = {
        category: selectedCategory,
        city: selectedCity,
        bhk: selectedBHK,
        type: selectedType,
        furniture: selectedFurniture,
      };

      const response = await axios.post(url, body);
      console.log("Search Results:", response.data);
      // You can navigate to another page or update UI based on response

    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  return (
    <div className="mx-auto d-flex justify-content-center">
      <div className="searching-container">
        <div className="category-buttons">
          <button
            className={`btn btn-light buy-btn ${selectedCategory === "buy" ? "active" : ""}`}
            onClick={() => handleCategoryChange("buy")}
          >
            Buy
          </button>
          <button
            className={`btn btn-light rent-btn ${selectedCategory === "rent" ? "active" : ""}`}
            onClick={() => handleCategoryChange("rent")}
          >
            Rent
          </button>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>City:</label>
            <select className="custom-dropdown" onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">City</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="filter-group">
            <label>BHK:</label>
            <select className="custom-dropdown" onChange={(e) => setSelectedBHK(e.target.value)}>
              <option value="">BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>
          </div>

          {selectedCategory === "rent" ? (
            <div className="filter-group">
              <label>Furniture:</label>
              <select className="custom-dropdown" onChange={(e) => setSelectedFurniture(e.target.value)}>
                <option value="">Furniture</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          ) : (
            <>
              <div className="filter-group">
                <label>Type:</label>
                <select
                  className="custom-dropdown"
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <option value="ready">Ready</option>
                  <option value="resale">Resale</option>
                  <option value="under-construction">Under Construction</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Furniture:</label>
                <select
                  className="custom-dropdown"
                  disabled={furnitureDisabled}
                  onChange={(e) => setSelectedFurniture(e.target.value)}
                >
                  <option value="">Furniture</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </>
          )}
        </div>

        <button onClick={handleSearch} className="btn btn-primary mt-3">
          Search
        </button>
      </div>
    </div>
  );
}

export default Searching;

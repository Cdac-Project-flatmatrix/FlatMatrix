import React, { useState } from "react";
import "../styles/Searching.css";
import { Link } from "react-router-dom";

function Searching() {
  const [selectedCategory, setSelectedCategory] = useState("rent");
  const [selectedType, setSelectedType] = useState(""); 
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

  return (
    <div className="mx-auto d-flex justify-content-center">

    <div className="searching-container">
      <div className="category-buttons">
        <button
          className={`btn btn-light buy-btn ${
            selectedCategory === "buy" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("buy")}
        >
          Buy
        </button>
        <button
          className={`btn btn-light rent-btn ${
            selectedCategory === "rent" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("rent")}
        >
          Rent
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>City:</label>
          <select className="custom-dropdown">
            <option> City</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Delhi</option>
          </select>
        </div>

        <div className="filter-group">
          <label>BHK:</label>
          <select className="custom-dropdown">
            <option> BHK</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4 BHK</option>
          </select>
        </div>

        {selectedCategory === "rent" ? (
          <div className="filter-group ">
            <label>Furniture:</label>
            <select className="custom-dropdown">
              <option> Furnished</option>
              <option>Furnished</option>
              <option>Semi-Furnished</option>
              <option>Unfurnished</option>
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
              <select className="custom-dropdown" disabled={furnitureDisabled}>
                <option>Furnished</option>
                <option>Semi-Furnished</option>
                <option>Unfurnished</option>
              </select>
            </div>
          </>
        )}
      </div>
      <Link to="/propertyList" className="btn btn-primary mt-3">
        Search
      </Link>
    </div>
    </div>

  );
}

export default Searching;

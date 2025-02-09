import React, { useEffect, useState } from "react";
import "../styles/Searching.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Searching() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBHK, setSelectedBHK] = useState(null);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [furnitureDisabled, setFurnitureDisabled] = useState(false);

  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFurnitureDisabled(false);
    setSelectedType(null);
    setSelectedFurniture(null);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === "under-construction") {
      setFurnitureDisabled(true);
      setSelectedFurniture(null);
    } else {
      setFurnitureDisabled(false);
    }
  };

  const handleSearch = () => {
    if (!sessionStorage.getItem("token")) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select Buy or Rent.");
      return;
    }
    if (!selectedCity) {
      toast.error("Please select a city.");
      return;
    }

    const searchData = {
      forRent: selectedCategory === "rent",
      type: selectedType,
      city: selectedCity,
      bedRooms: selectedBHK,
      furnished: selectedFurniture,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    navigate("/propertyList", { state: searchData });
  };

  return (
    <div className="mx-auto d-flex justify-content-center">
      <ToastContainer position="top-right" autoClose={3000} />
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
            <select
              className="custom-dropdown"
              value={selectedCity || ""}
              onChange={(e) => setSelectedCity(e.target.value || null)}
            >
              <option value="">City</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="filter-group">
            <label>BHK:</label>
            <select
              className="custom-dropdown"
              value={selectedBHK || ""}
              onChange={(e) => setSelectedBHK(e.target.value || null)}
            >
              <option value="">BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Price:</label>
            <input
              type="number"
              className="custom-dropdown"
              placeholder="Min Price"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(e.target.value || null)}
            />
          </div>

          <div className="filter-group">
            <label>Max Price:</label>
            <input
              type="number"
              className="custom-dropdown"
              placeholder="Max Price"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(e.target.value || null)}
            />
          </div>

          {selectedCategory === "rent" ? (
            <div className="filter-group">
              <label>Furniture:</label>
              <select
                className="custom-dropdown"
                value={selectedFurniture || ""}
                onChange={(e) => setSelectedFurniture(e.target.value || null)}
              >
                <option value="">Select</option>
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
                  value={selectedType || ""}
                  onChange={(e) => handleTypeChange(e.target.value || null)}
                >
                  <option value="">Select</option>
                  <option value="ready">Ready</option>
                  <option value="resale">Resale</option>
                  <option value="under-construction">Under Construction</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Furniture:</label>
                <select
                  className="custom-dropdown"
                  value={selectedFurniture || ""}
                  onChange={(e) => setSelectedFurniture(e.target.value || null)}
                  disabled={furnitureDisabled}
                >
                  <option value="">Select</option>
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

import React from "react";

import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="image-container">
          <img src="/image2.jpg" alt="Modern Flat" />
        </div>
        <div className="text-container">
          <h1 className="title text-start">
            Discover Your <br /> Dream Flat
          </h1>
          <p className="mb-4 mt-3 w-75">
            Explore the best flats for sale or rent in Pune's Hinjewadi area
            with FlatMatrix. Your ideal home is just a search away.
          </p>
          <div className="button-group">
            <button
              className="search-btn w-auto"
              onClick={() => navigate("/searching")}
            >
              Start Searching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

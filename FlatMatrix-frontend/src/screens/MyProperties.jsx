import React, { useState, useEffect } from "react";
import "../styles/PropertyUpdate.css";
import { Link } from "react-router-dom";
import { getMyProperties } from "../services/property";  
import MyPropertyList from "./MyPropertiesList";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch properties when the component mounts
    const fetchProperties = async () => {
      const response = await getMyProperties();
      if (response.status === "error") {
        setError(response.error);
      } else {
        setProperties(response);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <div className="update-container-wrapper">
      <div>
        <div className="row">
          <div className="col-5"></div>
          <div className="col">
            <Link
              to="/property-add"
              className="btn btn-light buy-btn mb-5"
              style={{ alignItems: "center", justifyContent: "center", width: "100%" }}
            >
              Add Property
            </Link>
          </div>
          <div className="col-5"></div>
        </div>

        {/* Display loading, error, or property list */}
        {loading ? (
          <p>Loading properties...</p>
        ) : error ? (
          <p>Error fetching properties: {error.message || error}</p>
        ) : (
          <MyPropertyList properties={properties} />
        )}
      </div>
    </div>
  );
};

export default MyProperties;

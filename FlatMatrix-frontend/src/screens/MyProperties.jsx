import React, { useState } from "react";
import "../styles/PropertyUpdate.css";
import { Link } from "react-router-dom";
import PropertyList from "./PropertyList";
import MyPropertyList from "./MyPropertiesList";

const MyProperties = () => {
  return (
    <div className="update-container-wrapper">
      <div>
        <div className="row">
          <div className="col-3"></div>
          {/* <div className="col"></div> */}
          <div className="col d-flex gap-3 mb-4">
  <Link
    to="/property-add"
    className="btn btn-light buy-btn"
    style={{ flex: 1, textAlign: "center" }}
  >
    Add Property
  </Link>
  <Link
    to="/seller-enquiries"
    className="btn btn-light buy-btn"
    style={{ flex: 1, textAlign: "center" }}
  >
    Enquiries
  </Link>
</div>

          <div className="col-3"></div>
        </div>
        <MyPropertyList />
      </div>
    </div>
  );
};

export default MyProperties;

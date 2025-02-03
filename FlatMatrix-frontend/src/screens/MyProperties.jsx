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
          <div className="col-5"></div>
          {/* <div className="col"></div> */}
          <div className="col">
            <Link
              to="/property-add"
              className="btn btn-light buy-btn mb-5"
              style={{ alignItems: "center", justifyContent: "center" , width:"100%"}}
            >
              Add Property
            </Link>
          </div>
          <div className="col-5"></div>
        </div>
        <MyPropertyList />
      </div>
    </div>
  );
};

export default MyProperties;

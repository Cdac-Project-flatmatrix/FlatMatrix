import React from "react";
import { Container, Button } from "react-bootstrap";
import "../styles/PropertyType.css";

const PropertyType = () => {
  return (
    <Container className="text-center mt-4">
      <h1 className="mb-3 property-heading">Select Property Ad Type</h1>
      <div className="d-flex justify-content-center gap-3 property-buttons">
        <Button className="search-btn">Rent</Button>
        <Button className="search-btn">PG</Button>
        <Button className="search-btn">Flat</Button>
        <Button className="search-btn">Hostel</Button>
      </div>
    </Container>
  );
};

export default PropertyType;

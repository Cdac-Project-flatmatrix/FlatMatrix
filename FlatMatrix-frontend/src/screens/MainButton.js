import React from "react";
import { Container, Button } from "react-bootstrap";
import "../styles/MainButton.css";

const MainButton = () => {
  return (
    <Container className="text-center mt-4 cta-button">
      <Button className="search-btn" size="lg">
        Start Posting Your Ad For FREE
      </Button>
    </Container>
  );
};

export default MainButton;

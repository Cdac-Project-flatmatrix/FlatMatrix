import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "../styles/FormSection.css";
import PropertyType from "./PropertyType";
import MainButton from "./MainButton";

const FormSection = () => {
  return (
    <div className="form-container-wrapper">
      <Container className="mt-4 form-container login-card">
        <Row className="mb-5">
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <PropertyType />
      <MainButton />
    </div>
  );
};

export default FormSection;

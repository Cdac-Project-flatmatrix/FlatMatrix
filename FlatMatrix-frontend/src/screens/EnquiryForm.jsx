import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ContactOwnerForm.css";
import { submitEnquiry } from "../services/enquiry";

const EnquiryForm = ({ propertyId, onClose }) => {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    try {
      await submitEnquiry({ propertyId, message });
      alert("Enquiry submitted successfully!");
      setShow(false);
      onClose && onClose(); // Close modal if parent provides onClose function
    } catch (error) {
      alert("Failed to submit enquiry. Try again later.");
    }
  };

  return (
    <>
      {show && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog login-card card contact-owner-card">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-white">Submit Enquiry</h5>
                <span
                  type="button"
                  className="close-btn-custom"
                  onClick={() => setShow(false)}
                ></span>
              </div>
              <div className="modal-body">
                <div>
                  <h2 className="heading text-white">Your Message</h2>
                  <div className="mb-3">
                    <label className="text-white">
                      Enter your query here...
                    </label>
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary search-btn"
                  onClick={handleSubmit}
                >
                  Submit Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default EnquiryForm;

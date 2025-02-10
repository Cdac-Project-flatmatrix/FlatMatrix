import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, useNavigate } from "react-router-dom";
import "../styles/ContactOwnerForm.css";

const ContactOwnerForm = () => {
  const [show, setShow] = useState(true);
  // useEffect(() => {
  //   setShow(showDetails);
  // }, [showDetails]);
  // useEffect(() => {
  //   setShowDetails(show);
  // }, [show]);
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [query, setQuery] = useState("");
  const submitQuery = () => {
    // console.log(email, contactNo, query);
    // if (email !== "" && contactNo !== "") setShow(false);
  };

  return (
    <>
      {/* Modal */}
      {show && (
        <div className=" text-white modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog login-card card contact-owner-card">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-white ">Contact Owner</h5>
                <span
                  type="button"
                  className="close-btn-custom"
                  onClick={() => setShow(false)}
                ></span>
              </div>
              <div className="modal-body">
                <div className="">
                  <h2 className="heading text-white ">Contact Details</h2>

                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label className="text-white" htmlFor="">
                          Email*
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="text-white" htmlFor="">
                          Contact No*
                        </label>
                        <input
                          onChange={(e) => setContactNo(e.target.value)}
                          type="tel"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="text-white " htmlFor="">
                          Your query here...
                        </label>
                        <textarea
                          onChange={(e) => setQuery(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary search-btn"
                  onClick={() => {
                    submitQuery();
                  }}
                >
                  Submit Query
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ContactOwnerForm;

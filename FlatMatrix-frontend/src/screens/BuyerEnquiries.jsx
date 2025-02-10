import React, { useEffect, useState } from "react";
import { getBuyerEnquiries } from "../services/enquiry";

export function BuyerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const response = await getBuyerEnquiries();
    setEnquiries(response.data);
  };

  return (
    <div className="container">
      <h2>My Enquiries</h2>

      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        enquiries.map((enquiry) => (
          <div key={enquiry.enquiryId} className="card">
            <p>
              <strong>Message:</strong> {enquiry.message}
            </p>
            <p>
              <strong>Reply:</strong> {enquiry.reply || "No reply yet"}
            </p>
            <p>
              <strong>Status:</strong> {enquiry.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default BuyerEnquiries;

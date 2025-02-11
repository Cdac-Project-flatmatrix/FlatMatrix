import React, { useEffect, useState } from "react";
import { getBuyerEnquiries } from "../services/enquiry";
import "../styles/Wishlist.css";

export function BuyerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await getBuyerEnquiries();
      setEnquiries(response.data);
    } catch (error) {
      console.error("Error fetching enquiries", error);
      setEnquiries([]);
    }
  };

  return (
    <div className="wishlist-container-wrapper">
      <div className="wishlist-container">
        <h2 className="m-2">My Enquiries</h2>
        {enquiries.length === 0 ? (
          <p className="text-white">No enquiries found.</p>
        ) : (
          <ul className="wishlist-list m-2">
            {enquiries.map((enquiry, index) => (
              <li key={enquiry.enquiryId} className="wishlist-item">
                <span className="wishlist-item-number">{index + 1}</span>
                <div className="wishlist-item-content">
                  <div className="wishlist-item-details2">
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BuyerEnquiries;

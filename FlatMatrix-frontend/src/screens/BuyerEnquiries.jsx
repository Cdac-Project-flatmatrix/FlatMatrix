import React, { useEffect, useState } from "react";
import { getBuyerEnquiries } from "../services/enquiry";
import "../styles/Wishlist.css";

export function BuyerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [showSolved, setShowSolved] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, [showSolved]);

  const fetchEnquiries = async () => {
    try {
      console.log(showSolved);
      const response = await getBuyerEnquiries(showSolved);
      if (response.status === 200) {
        setEnquiries(response.data);
      } else {
        console.error("Error fetching enquiries");
        setEnquiries([]);
      }
    } catch (error) {
      console.error("Error fetching enquiries", error);
      setEnquiries([]);
    }
  };

  return (
    <div className="wishlist-container-wrapper">
      <div className="wishlist-container">
        <h2 className="m-2">My Enquiries</h2>

        {/* Toggle for solved enquiries */}
        <div className="m-3">
          <label className="text-white">
            <input
              type="checkbox"
              checked={showSolved}
              onChange={() => setShowSolved((prev) => !prev)}
            />
            Show Solved Enquiries
          </label>
        </div>

        {enquiries.length === 0 ? (
          <p className="text-white">No enquiries found.</p>
        ) : (
          <ul className="wishlist-list m-2">
            {enquiries.map((enquiry, index) => (
              <li key={enquiry.id} className="wishlist-item">
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
                      <strong>Status:</strong>{" "}
                      <span
                        className={enquiry.status === "Solved" ? "text-success" : "text-warning"}
                      >
                        {enquiry.status}
                      </span>
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

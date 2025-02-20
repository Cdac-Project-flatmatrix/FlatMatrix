import React, { useEffect, useState } from "react";
import { getSellerEnquiries, solveEnquiry } from "../services/enquiry";
import "../styles/Wishlist.css"; // Ensure this is imported

export function SellerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [showSolved, setShowSolved] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, [showSolved]);

  const fetchEnquiries = async () => {
    const response = await getSellerEnquiries(showSolved);
    if (response.status === 200) {
      console.log(response.data);
      setEnquiries(response.data);
    } else {
      alert("Failed to load enquiries");
    }
  };

  const handleSolve = async (enquiryId) => {
    if (!reply.trim()) {
      alert("Please enter a reply before marking as solved.");
      return;
    }

    const response = await solveEnquiry(enquiryId, reply);
    if (response.status === 200) {
      alert("Enquiry solved!");
      setReply("");
      fetchEnquiries();
    } else {
      alert(response.error.message);
    }
  };

  return (
    <div className="wishlist-container-wrapper">
      <div className="wishlist-container">
        <h2 className="m-2">Seller Enquiries</h2>

        <div className="m-3">
          <label className="text-white">
            <input
              type="checkbox"
              checked={showSolved}
              onChange={() => {
                setShowSolved((prev) => {
                  const newShowSolved = !prev;
                  fetchEnquiries(newShowSolved);
                  return newShowSolved;
                });
              }}
            />
            Show Solved Enquiries
          </label>
        </div>

        {enquiries.length === 0 ? (
          <p className="text-white">No enquiries found.</p>
        ) : (
          <ul className="wishlist-list m-2">
            {enquiries.map((enquiry) => (
              <li key={enquiry.id} className="wishlist-item2">
                <div className="wishlist-item-details2">
                  <p>
                    <strong>Buyer:</strong> {enquiry.buyerName}
                  </p>
                  <p>
                    <strong>Message:</strong> {enquiry.message}
                  </p>
                  <p>
                    <strong>Reply:</strong> {enquiry.reply || "No reply yet"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={enquiry.status === "Solved" ? "text-success" : "text-warning"}>
                      {enquiry.status}
                    </span>
                  </p>

                  {/* Show only if the enquiry is not solved */}
                  {!showSolved && enquiry.status !== "Solved" && (
                    <>
                      <textarea
                        placeholder="Enter reply"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="form-control mt-2"
                      />
                      <button
                        onClick={() => handleSolve(enquiry.id)}
                        className="btn action-btn mt-2"
                      >
                        Solve
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SellerEnquiries;

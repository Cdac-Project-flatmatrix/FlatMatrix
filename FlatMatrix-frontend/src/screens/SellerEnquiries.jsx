import React, { useEffect, useState } from "react";
import { getSellerEnquiries, solveEnquiry } from "../services/enquiry";

export function SellerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [showSolved, setShowSolved] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, [showSolved]);

  const fetchEnquiries = async () => {
    const response = await getSellerEnquiries(showSolved);
    setEnquiries(response.data);
  };

  const handleSolve = async (enquiryId) => {
    if (!reply) {
      alert("Please enter a reply before marking as solved.");
      return;
    }

    await solveEnquiry(enquiryId, reply);
    alert("Enquiry solved!");
    setReply("");
    fetchEnquiries();
  };

  return (
    <div className="container">
      <h2>Seller Enquiries</h2>
      <label>
        <input
          type="checkbox"
          checked={showSolved}
          onChange={() => setShowSolved(!showSolved)}
        />
        Show Solved Enquiries
      </label>

      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        enquiries.map((enquiry) => (
          <div key={enquiry.enquiryId} className="card">
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
              <strong>Status:</strong> {enquiry.status}
            </p>

            {!showSolved && (
              <>
                <textarea
                  placeholder="Enter reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button onClick={() => handleSolve(enquiry.enquiryId)}>
                  Solve
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default SellerEnquiries;

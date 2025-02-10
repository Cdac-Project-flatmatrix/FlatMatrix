import axios from "axios";
import { createUrl } from "../utils";

export const submitEnquiry = async (enquiry) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`enquiries/${enquiry.propertyId}`);
    const response = await axios.post(url, enquiry, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
};

// Get seller queries (default: unsolved)
export const getSellerEnquiries = async (showSolved = false) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`enquiries/seller?solved=${showSolved}`);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
};

// Mark a query as solved with a reply
export const solveEnquiry = async (enquiryId, reply) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`enquiries/${enquiryId}/solve`);
    const response = await axios.put(
      url,
      { reply },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
};

// Get buyer's queries
export const getBuyerEnquiries = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl("enquiries/buyer");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
};

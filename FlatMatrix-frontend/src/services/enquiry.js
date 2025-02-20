import axios from "axios";
import { createUrl } from "../utils";

export const submitEnquiry = async (enquiry) => {
  try {
    console.log(enquiry);
    const token = sessionStorage.getItem("token");
    const url = createUrl(`enquiries`);
    console.log(url);
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

export const getSellerEnquiries = async (showSolved) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`enquiries/seller?showSolved=${showSolved}`);
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
    const url = createUrl(`enquiries/${enquiryId}/solve?reply=${encodeURIComponent(reply)}`);
    const response = await axios.put(
      url,
      { },
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

export const getBuyerEnquiries = async (showSolved) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`enquiries/buyer?showSolved=${showSolved}`);
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

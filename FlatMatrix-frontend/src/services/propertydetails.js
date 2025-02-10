import axios from "axios";
import { createUrl } from "../utils";

// Add property to wishlist
export async function addToWishlist(propertyId) {
  try {
    const url = createUrl("wishlist/add");
    const token = sessionStorage["token"];
    const response = await axios.post(url, { propertyId }, {
      headers: { token },
    });
    return { status: "success", data: response.data };
  } catch (ex) {
    return { status: "error", error: ex.message };
  }
}

// Contact the property owner
export async function contactOwner(ownerId) {
  try {
    const url = createUrl("property/contact-owner");
    const token = sessionStorage["token"];
    const response = await axios.post(url, { ownerId }, {
      headers: { token },
    });
    return { status: "success", data: response.data };
  } catch (ex) {
    return { status: "error", error: ex.message };
  }
}

import axios from "axios";
import { createUrl } from "../utils";

// Fetch property list
export async function fetchProperties() {
    try {
      const url = createUrl("properties"); // Adjust endpoint as needed
      const response = await axios.get(url);
      return response.data;
    } catch (ex) {
      return { status: "error", error: ex };
    }
  }
  
  // Add property to wishlist
  export async function addToWishlist(propertyId) {
    try {
      const url = createUrl("wishlist/add");
      const token = sessionStorage["token"];
      const response = await axios.post(
        url,
        { propertyId },
        { headers: { token } }
      );
      return response.data;
    } catch (ex) {
      return { status: "error", error: ex };
    }
  }
  
import axios from "axios";
import { createUrl } from "../utils";
export async function updateProperty(propertyId, propertyData) {
    try {
      const url = createUrl(`properties/${propertyId}`); // Adjust endpoint as needed
      const token = sessionStorage["token"];
  
      const response = await axios.put(url, propertyData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Assuming your backend uses Bearer tokens
        },
      });
      return response.data;
    } catch (error) {
      return { status: "error", error: error.message };
    }
  }
  
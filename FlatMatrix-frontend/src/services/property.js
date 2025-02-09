import axios from "axios";
import { createUrl } from "../utils";

export const addProperty = async (propertyData) => {
  try {
    const url = createUrl("properties");
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No authentication token found!");

    console.log(propertyData);
    const response = await axios.post(url, propertyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

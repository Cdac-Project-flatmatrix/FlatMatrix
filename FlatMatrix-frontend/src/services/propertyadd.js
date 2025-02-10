
import axios from "axios";
import { createUrl } from "../utils";


export const addProperty = async (propertyData) => {
  const formData = new FormData();
  
 
  for (const key in propertyData) {
    if (key === "address") {
      for (const addressKey in propertyData.address) {
        formData.append(`address.${addressKey}`, propertyData.address[addressKey]);
      }
    } else {
      formData.append(key, propertyData[key]);
    }
  }


  if (propertyData.photo) {
    formData.append("photo", propertyData.photo);
  }

  try {
    const response = await axios.post(createUrl("properties"), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

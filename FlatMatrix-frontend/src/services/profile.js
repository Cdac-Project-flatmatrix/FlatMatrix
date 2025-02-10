import axios from "axios";
import { createUrl } from "../utils";  

export async function getUserProfile() {
  try {
    const url = createUrl("api/profile"); 
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { status: "error", error: error.message };
  }
}

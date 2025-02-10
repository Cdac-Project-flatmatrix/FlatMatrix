
import axios from "axios";
import { createUrl } from "../utils";


export async function getMyProperties() {
  try {
    const url = createUrl("property/my-properties");
    const token = sessionStorage["token"];
    const response = await axios.get(url, {
      headers: { token },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}


export async function addProperty(propertyDetails) {
  try {
    const url = createUrl("property/add");
    const token = sessionStorage["token"];
    const response = await axios.post(url, propertyDetails, {
      headers: { token },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}


export async function updateProperty(propertyId, updatedDetails) {
  try {
    const url = createUrl(`property/update/${propertyId}`);
    const token = sessionStorage["token"];
    const response = await axios.put(url, updatedDetails, {
      headers: { token },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}


export async function deleteProperty(propertyId) {
  try {
    const url = createUrl(`property/delete/${propertyId}`);
    const token = sessionStorage["token"];
    const response = await axios.delete(url, {
      headers: { token },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

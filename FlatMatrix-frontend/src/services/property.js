import axios from "axios";
import { createUrl } from "../utils";

export async function getProperties(searchData) {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl("properties/filtered-properties");
    const response = await axios.post(url, searchData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}
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

export async function getMyProperties() {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl("properties/my");
    console.log(token);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function addTowishlist(id) {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`wishlist/add/${id}`);
    console.log(token);
    const response = await axios.post(
      url,
      {},
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
}
export async function getWishlist() {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`wishlist`);
    console.log(token);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function updateMyProperty(property) {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`properties/${property.id}`);
    console.log(property);
    const response = await axios.post(url, property, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function removeMyProperty(id) {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`properties/${id}`);
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function removeWishlist(id) {
  try {
    const token = sessionStorage.getItem("token");
    const url = createUrl(`wishlist/remove/${id}`);
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}


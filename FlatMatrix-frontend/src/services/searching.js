import axios from "axios";
import { createUrl } from "../utils";

export async function login(username, password) {
  try {
    const url = createUrl("auth/login");

    const body = {
      username,
      password,
    };
    console.log(body);
    const response = await axios.post(url, body);
    sessionStorage["token"] = response.data.token;
    console.log(response.data.token);
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function register(firstName, lastName, email, phone, password) {
  try {
    const url = createUrl("user/register");
    const body = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function updatePassword(password) {
  try {
    const url = createUrl("user/update-password");
    const body = {
      password,
    };
    const token = sessionStorage["token"];
    const response = await axios.put(url, body, {
      headers: { token },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function getMyProfile() {
  try {
    const url = createUrl("user/profile");
    const token = sessionStorage["token"];
    const response = await axios.get(url, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export async function updateMyProfile(firstName, lastName, phone) {
  try {
    const url = createUrl("user/profile");
    const token = sessionStorage["token"];
    const body = {
      firstName,
      lastName,
      phone,
    };
    const response = await axios.put(url, body, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (ex) {
    return { status: "error", error: ex };
  }
}

export const resetPassword = async (email, newPassword) => {
  try {
    const url = createUrl("auth/reset-password");
    const response = await axios.post(url, {
      email: email,
      newPassword: newPassword,
    });

    if (response.status === 200) {
      return { status: "success", data: response.data };
    } else {
      return { status: "error", error: response.data.message };
    }
  } catch (error) {
    return { status: "error", error: "An error occurred, please try again." };
  }
};

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

export async function register(userDto) {
  try {
    const url = createUrl("auth/register");
    const body = {
      userDto,
    };
    console.log("Sending:", body);
    // userDto.profilePhoto=userDto.profilePhoto.path
    const response = await axios.post(url, userDto);
    return response;
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

// Other existing imports and functions...

// Example of a resetPassword function
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch("/api/reset-password", {
      // Replace with your actual API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        newPassword: newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { status: "success", data: data }; // Return success status and data
    } else {
      return { status: "error", error: data.message }; // Return error status and message
    }
  } catch (error) {
    return { status: "error", error: "An error occurred, please try again." }; // Catch any network errors
  }
};

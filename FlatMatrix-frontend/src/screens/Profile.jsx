import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { getMyProfile, updateMyProfile } from "../services/user";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    profilePhoto: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "", // Added country field
    },
    userName: "",
    email: "",
  });

  const navigate = useNavigate();

  const getUser = async () => {
    const response = await getMyProfile();
    if (!response || !response.data) {
      alert("Error fetching user data");
      return;
    }

    const data = response.data;
    setUser({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      password: "",
      phoneNumber: data.phoneNumber || "",
      profilePhoto: data.profilePhoto || "",
      address: {
        street: data.address?.street || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        zip: data.address?.pinCode || "",
        country: data.address?.country || "", // Map backend country field
      },
      userName: data.userName || "",
      email: data.email || "",
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const onUpdate = async () => {
    const response = await updateMyProfile(user);
    if (response.status === 200) {
      alert("Profile updated ✅");
      navigate("/");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="wishlist-container-wrapper">
      <div className="row justify-content-center">
        <div className="col d-flex justify-content-center mb-5 pb-5">
          <div className="card custom-box-shadow p-4 text-white text-center">
            <h2 className="mb-4 fs-3 text-white">
              Profile Information
            </h2>

            {user.profilePhoto && (
              <div className="mb-3">
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <form className="register-form text-white">
              <label className="m-2 text-white">Username</label>
              <input
                className="form-control mb-2"
                type="text"
                value={user.userName}
                disabled
              />

              <label className="m-2 text-white">Email Address</label>
              <input
                className="form-control mb-2"
                type="email"
                value={user.email}
                disabled
              />

              <label className="m-2 text-white">First Name</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />

              <label className="m-2 text-white">Last Name</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />

              <label className="text-white m-2">Phone Number</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.phoneNumber}
                onChange={(e) =>
                  setUser({ ...user, phoneNumber: e.target.value })
                }
              />

              {/* <label className="m-2 text-white">Address</label> */}
              <label className="m-1 text-white">Street</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.address.street}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, street: e.target.value },
                  })
                }
              />
              <label className="m-1 text-white">City</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.address.city}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, city: e.target.value },
                  })
                }
              />
              <label className="m-1 text-white">State</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.address.state}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, state: e.target.value },
                  })
                }
              />
              <label className="m-1 text-white">ZIP Code</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.address.zip}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, zip: e.target.value },
                  })
                }
              />
              <label className="m-1 text-white">Country</label>
              <input
                className="form-control mb-2 text-white"
                type="text"
                value={user.address.country}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, country: e.target.value },
                  })
                }
              />

              <button
                type="button"
                onClick={onUpdate}
                className="btn action-btn w-100 mt-3"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

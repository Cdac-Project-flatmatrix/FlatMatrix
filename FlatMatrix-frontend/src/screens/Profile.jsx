import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Pune",
    username: "johndoe123",
    password: "********",
  };

  return (
    <div className="wishlist-container-wrapper ">
      <div className="row justify-content-center">
        <div className="col d-flex justify-content-center mb-5 pb-5">
          <div className="card custom-box-shadow p-4">
            <div className="">
              <h2 className="text-center mb-4 text-white fs-3">
                Profile Information
              </h2>
              <form className="register-form text-white">
                <div className="">
                  <div className="">
                    <label className="m-2 text-white" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-control mb-2"
                      type="text"
                      id="username"
                      value={user.username}
                      placeholder="User Name"
                    />
                  </div>

                  <div className="">
                    <label className="m-2 text-white" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className="form-control mb-2 w-100 "
                      type="text"
                      id="name"
                      value={user.name}
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="">
                    <label className="m-2 text-white w-100 " htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      placeholder="Email Address m-2"
                    />
                  </div>

                  <div className="">
                    <label className="m-2 text-white" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={user.phone}
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="">
                    <label className="m-2 text-white" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={user.address}
                      placeholder="Address"
                    />
                  </div>
                  <div className="">
                    <label className="m-2 text-white" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={user.password}
                      placeholder="Password"
                      className="w-100 "
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <button type="button" className="btn action-btn w-100 mt-3">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import { useState } from "react";
import { register } from "../services/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      longitude: "",
      latitude: "",
    },
    profilePhoto: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setUser({
        ...user,
        address: {
          ...user.address,
          [addressField]: value,
        },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const onDrop = (acceptedFiles) => {
    setUser({ ...user, profilePhoto: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const onRegister = async () => {
    if (
      !user.email ||
      !user.password ||
      !user.userName ||
      !user.profilePhoto
    ) {
      toast.warning("Please fill all required fields and upload a photo.");
      return;
    }

    const userData = {
      ...user,
      pinCode: Number(user.address.pinCode),
      longitude: Number(user.address.longitude),
      latitude: Number(user.address.latitude),
      status: true,
    };

    try {
      console.log(userData);
      const result = await register(userData);
      if (result.status === "success") {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="wishlist-container-wrapper">
      <div className="row justify-content-center">
        <div className="col d-flex justify-content-center mb-5 pb-5">
          <div className="card custom-box-shadow p-4">
            <h2 className="text-center mb-4 text-white fs-3">Register</h2>
            <form className="register-form text-white">
              <div className="row mx-0 name-wrapper gap-2 d-flex w-100">
                <div className="col px-0">
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="col px-0">
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <input
                className="form-control mb-2"
                type="text"
                name="userName"
                onChange={handleChange}
                placeholder="Username"
              />
              <input
                className="form-control mb-2"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                className="form-control mb-2"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <input
                className="form-control mb-2"
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <div className="d-flex gap-2 align-items-center">
                <label className="text-white">Gender:</label>
                <input
                  className="m-2"
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="male"
                />{" "}
                <label className="text-white">Male</label>
                <input
                  className="m-2"
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="female"
                />{" "}
                <label className="text-white">Female</label>
              </div>

              <div
                {...getRootProps()}
                className="dropzone p-4 text-center rounded w-100 m-2"
                style={{ cursor: "pointer" }}
              >
                <input {...getInputProps()} />
                {user.profilePhoto ? (
                  <p className="text-success">✔ {user.profilePhoto.name}</p>
                ) : (
                  <p>Drag & Drop a photo here, or click to select</p>
                )}
              </div>
              <h5 className="mt-3">Address</h5>
              <input
                className="form-control mb-2"
                type="text"
                name="address.street"
                onChange={handleChange}
                placeholder="Street"
              />
              <div className="row">
                <div className="col-md-6">
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="address.city"
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="address.state"
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
              </div>
              <input
                className="form-control mb-2"
                type="text"
                name="address.country"
                onChange={handleChange}
                placeholder="Country"
              />
              <input
                className="form-control mb-2"
                type="number"
                name="address.pinCode"
                onChange={handleChange}
                placeholder="Pin Code"
              />
              <div className="row">
                <div className="col-md-6">
                  <input
                    className="form-control mb-2"
                    type="number"
                    name="address.longitude"
                    onChange={handleChange}
                    placeholder="Longitude"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control mb-2"
                    type="number"
                    name="address.latitude"
                    onChange={handleChange}
                    placeholder="Latitude"
                  />
                </div>
              </div>
              {/* Role Selection
              <h5 className="mt-3">Select Role</h5>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="role" value="BUYER" checked={user.role === 'BUYER'} onChange={handleChange} />
                <label className="form-check-label">Buyer</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="role" value="SELLER" checked={user.role === 'SELLER'} onChange={handleChange} />
                <label className="form-check-label">Seller</label>
              </div> */}
              {/* Submit Button */}
              <button
                type="button"
                className="btn action-btn w-100 mt-3"
                onClick={onRegister}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

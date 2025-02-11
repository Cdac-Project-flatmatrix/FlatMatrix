import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPassword, updatePassword } from "../services/user";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onResetPassword = async () => {
    if (email.length === 0) {
      toast.warning("Please enter email");
    } else if (newPassword.length === 0) {
      toast.warning("Please enter new password");
    } else if (confirmPassword !== newPassword) {
      toast.warning("Passwords do not match");
    } else {
      setLoading(true);
      const result = await updatePassword(email, oldPassword, newPassword);

      setLoading(false);

      if (result.status === 200) {
        alert(
          "Password reset successfully. You can now login with your new password."
        );

        navigate("/login");
      } else {
        alert("invalid email or old password");
      }
    }
  };

  return (
    <div className="wishlist-container-wrapper" style={{ color: "white" }}>
      <h2 className="heading">Reset Password</h2>

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Old Password</label>
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">New Password</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <button
            onClick={onResetPassword}
            className="btn btn-success mt-3"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default PasswordReset;

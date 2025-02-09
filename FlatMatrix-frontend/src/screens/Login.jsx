import { useState } from "react";
import { login } from "../services/user";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLogin = async () => {
    if (email.length == 0) {
      toast.warning("Please enter email");
    } else if (password.length == 0) {
      toast.warning("Please enter password");
    } else {
      try {
        const result = await login(email, password);
        if (result.status === 200) {
          const data = result["data"];
          const token = data["token"];
          sessionStorage["token"] = token;
          toast.success("welcome to the application");
          navigate('/');
        } else {
          toast.error(result["error"]);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="login-card-wrapper">
      <div className="login-card card p-4">
        <h2 className="heading">Login</h2>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <div>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
              </div>
              <div className="d-flex">
                <p className="w-25 d-flex align-items-center">
                  Forgot password?{" "}
                </p>
                <button
                  className="btn btn-link w-auto"
                  onClick={() => navigate("/password-reset")}
                >
                  Reset here.
                </button>
              </div>
              <button onClick={onLogin} className="btn mt-5 login-btn">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

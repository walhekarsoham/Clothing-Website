import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);

      const redirectTo = location.state?.from || "/";
      const buyNowProduct = location.state?.buyNowProduct;

      if (buyNowProduct) {
        navigate(redirectTo, {
          state: { buyNowProduct },
          replace: true,
        });
      } else {
        navigate(redirectTo, { replace: true });
      }

    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">LOGIN</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control login-input mb-3"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control login-input mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-danger">{error}</p>}

          <button
            type="submit"
            className="btn login-btn w-100 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Users from "../../models/user/useUsers";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noCompte, setNoCompte] = useState(false);
  const { users, loading, error } = Users();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Please fill in all fields.");
      return;
    } else if (loading) {
      console.log("Loading...");
      return;
    } else if (error) {
      console.error("Error fetching users:", error);
      return;
    }
    if (
      users.some((user) => user.email === email && user.password === password)
    ) {
      console.log("Login successful!");
      navigate("/");
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      setNoCompte(true);
      console.log("Invalid email or password.");
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="topContainer">
          <h1 className="hello">Hello!</h1>
          <p>
            <span className="welcome">Welcome to </span>
            <span className="logo">Golden Spoon</span>
          </p>
        </div>
        <div className="downContainer">
          <h1 className="login">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="email">
              <MdEmail className="icon" />
              <input
                placeholder="Email address"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="password">
              <FaLock className="icon" />
              <input
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {noCompte && (
              <p className="error-message">Invalid email or password.</p>
            )}
            <button className="button" type="submit">
              Login
            </button>
            <div className="center">
              <div className="or-separator">
                <span className="line"></span>
                <span className="or-text">OR</span>
                <span className="line"></span>
              </div>
              <p>
                <span className="down">Don't have an account? </span>
                <button className="signup" onClick={() => navigate("/signUp")}>
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

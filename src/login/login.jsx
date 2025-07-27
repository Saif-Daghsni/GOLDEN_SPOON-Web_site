import { useState } from "react";
import { useEffect } from "react";
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

const handleSubmit = async (e) => {
  e.preventDefault();

  if (email === "" || password === "") {
    console.log("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/"); // Redirect to home or protected route
    } else {
      setNoCompte(true);
      console.error(data.error || "Invalid email or password.");
    }
  } catch (err) {
    console.error("Error during login:", err);
  }
};

  
  useEffect(() => {
    document.body.style.backgroundImage = `url("src/login/food.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.overflowY = "auto";

    return () => {
      // Reset when component unmounts
      document.body.style.backgroundImage = "";
    };
  }, []);
  return (
    <>
      <div className="login-container2">
        <div className="topContainer2">
          <h1 className="hello2">Hello!</h1>
          <p>
            <span className="welcome2">Welcome to </span>
            <span className="logo2">Golden Spoon</span>
          </p>
        </div>
        <div className="downContainer2">
          <h1 className="login2">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="email2">
              <MdEmail className="icon2" />
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

            <div className="password2">
              <FaLock className="icon2" />
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
              <p className="error-message2">Invalid email or password.</p>
            )}
            <button className="button2" type="submit">
              Login
            </button>
            <div className="center2">
              <div className="or-separator2">
                <span className="line2"></span>
                <span className="or-text2">OR</span>
                <span className="line2"></span>
              </div>
              <p>
                <span className="down2">Don't have an account? </span>
                <button className="signup2" onClick={() => navigate("/signUp")}>
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

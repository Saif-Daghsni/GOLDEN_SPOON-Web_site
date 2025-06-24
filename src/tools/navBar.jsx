import "./navBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <a href="" className="logo">
        Golden Spoon
      </a>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/">Dishes</a>
        <a href="/">Drinks</a>
        <a href="/">Desserts</a>
        <a href="/">Notifications</a>
        <button className="Login" onClick={() => navigate("/login")}>Login</button>
        <button className="Signup"onClick={() => navigate("/signUp")}>Sign Up</button>
      </nav>
    </header>
  );
};

export default NavBar;

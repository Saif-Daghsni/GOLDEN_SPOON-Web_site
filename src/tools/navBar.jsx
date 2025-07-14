import "./navBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <a href="/" className="logo">
        Golden Spoon
      </a>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/DisplayPlates">Dishes</a>
        <a href="/DisplayPlates">Drinks</a>
        <a href="/DisplayPlates">Desserts</a>
       
      </nav>
       <button className="Signup"onClick={() => navigate("/Profile")}>Profile</button>
    </header>
  );
};

export default NavBar;

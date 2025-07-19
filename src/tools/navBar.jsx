import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <a href="/" className="logo">
        Golden Spoon
      </a>
      <nav className="navbar">
        <Link to="/" >Home</Link>
        <Link to="/DisplayPlates" state={{ type: 'Dishes' }}>Dishes</Link>
        <Link to="/DisplayPlates" state={{ type: 'Drinkes' }}>Drinkes</Link>
        <Link to="/DisplayPlates" state={{ type: 'Desserts' }}>Desserts</Link>
      </nav>
      <button className="Signup" onClick={() => navigate("/Profile")}>Profile</button>
    </header>
  );
};

export default NavBar;

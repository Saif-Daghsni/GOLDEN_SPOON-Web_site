import "./footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <footer>
        <table className="footer-table">
          <td>
            <tr>
              <td>
                <div className="title">Explore</div>
                <div className="links1">
                  <a className="a" href="/explore">Shop All</a>
                </div>
                <div className="links">
                  <a className="a" href="/explore">Weekend Specials</a>
                </div>
                <div className="links">
                  <a className="a" href="/explore">Family Meals</a>
                </div>
              </td>

              <td>
                <div className="title">Visit</div>
                <div className="links1">
                  <a className="a" href="/explore">Profile</a>
                </div>
                <div className="links">
                  <a className="a" href="/explore">Chat page</a>
                </div>
                <div className="links">
                  <a className="a" href="/explore">Notifications</a>
                </div>
              </td>

              <td>
                <div className="title">More</div>
                <div className="links1">
                  <a className="a" href="/explore">Our Story</a>
                </div>
                <div className="links">
                  <a className="a" href="/explore">Caterings</a>
                </div>
                <div className="links">
                  <a className="a" href="/explore">Contact Us</a>
                </div>
              </td>
            </tr>

            <td colSpan="3">
              <div className="line1"></div>
            </td>
          </td>
        </table>
      </footer>
      <div className="footer-bottom">
        <a>© 2025 Golden Spoon. All rights reserved.</a>
        <a className="a" href="/explore">Terms and Conditions</a>
        <a className="a" href="/explore">Privacy Police</a>

        <div>
          <a href="/explore">
            <FaFacebook size={24} className="icon" />
          </a>
          <a href="/explore">
            <FaInstagram size={24} color="#C13584" />
          </a>
        </div>
        
      </div>
    </div>
  );
}

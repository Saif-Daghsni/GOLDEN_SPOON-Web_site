import "./home.css";
import Footer from "../tools/footer";
import NavBar from "../tools/navBar";
import FullServices from "../tools/FullServices";
import Ambiance from "../tools/Ambiance";
import { Openning } from "../tools/Openning";

export default function Home() {
    return (
        <div className="home-container">
            <NavBar />
            <Openning />
            <FullServices />
            <FullServices />
            <Ambiance />
            <FullServices />
            <Footer />
        </div>
    );
}

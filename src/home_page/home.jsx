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
            <FullServices name={"Dishes"}/>
            <FullServices name={"Drinkes"}/>
            <Ambiance />
            <FullServices name={"Desserts"}/>
            <Footer />
        </div>
    );
}

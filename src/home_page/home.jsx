import "./home.css";
import Footer from "../tools/footer";
import FullServices from "../tools/FullServices";
import Ambiance from "../tools/Ambiance";
import { Openning } from "../tools/Openning";
import NavBar from "../tools/NavBar";
import Description from "../tools/Description";
import { useState } from "react";
import Achat from "../tools/Achat";

export default function Home(props) {
  const [description, setdescription] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setorder] = useState([]);
  return (
    <div className="home-container">
      
      <Achat order={order} setorder={setorder} />
      <NavBar />
      <Openning />
      <FullServices
        setPlatesname={props.setPlatesname}
        setSelectedItem={setSelectedItem}
        setdescription={setdescription}
        name={"Dishes"}
        setorder={setorder}
      />
      <FullServices
        setSelectedItem={setSelectedItem}
        setdescription={setdescription}
        name={"Drinkes"}
        setorder={setorder}
      />
      <div id="menuSection" className="scroll-section">
        <Ambiance />
      </div>
      <FullServices
        setSelectedItem={setSelectedItem}
        setdescription={setdescription}
        name={"Desserts"}
        setorder={setorder}
      />
      <Footer />
      {description && (
        <Description item={selectedItem} setdescription={setdescription} />
      )}
    </div>
  );
}

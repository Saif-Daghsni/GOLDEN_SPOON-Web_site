import "./home.css";
import Footer from "../tools/footer";
import NavBar from "../tools/navBar";
import FullServices from "../tools/FullServices";
import Ambiance from "../tools/Ambiance";
import { Openning } from "../tools/Openning";
import Description from "../tools/Description";
import { useState } from "react";

export default function Home() {
    const [description,setdescription]=useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
    return (
        <div className="home-container" >
            <NavBar />
            <Openning />
            <FullServices setSelectedItem={setSelectedItem} setdescription={setdescription} name={"Dishes"}/>
            <FullServices setSelectedItem={setSelectedItem} setdescription={setdescription} name={"Drinkes"}/>
            <div id="menuSection"  className="scroll-section" ><Ambiance  /></div>
            <FullServices setSelectedItem={setSelectedItem} setdescription={setdescription} name={"Desserts"}/>
            <Footer />
            {description && (<Description item={selectedItem}  setdescription={setdescription}/>)}
            
    </div>
    );
}

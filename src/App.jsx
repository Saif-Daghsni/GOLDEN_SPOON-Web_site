import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Owner from "./Owner_page/Owner";
import AddPlates from "./Owner_page/AddPlates";
import DisplayPlates from "./DisplayPlates/DisplayPlates";
import Profile from "./Profile/Profile"
import { useState } from "react";
import Description from "./tools/Description";
// add ambiance
const Login = lazy(() => import("./login/login"));
const Signup = lazy(() => import("./SignUp/signUp"));
const Home = lazy(() => import("./home_page/home"));

function App() {
    const [description,setdescription]=useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/DisplayPlates" element={<DisplayPlates  setSelectedItem={setSelectedItem} setdescription={setdescription}  />} />
          <Route path="/Owner" element={<Owner />} />
          <Route path="/AddPlates" element={<AddPlates/>} />
          <Route path="/Profile" element={<Profile/>} />
        </Routes>
      </Suspense>
            {description && (<Description item={selectedItem}  setdescription={setdescription}/>)}
    </BrowserRouter>
  );
}

export default App;

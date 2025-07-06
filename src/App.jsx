import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Owner from "./Owner_page/Owner";
import AddPlates from "./Owner_page/AddPlates";

// add ambiance
const Login = lazy(() => import("./login/login"));
const Signup = lazy(() => import("./SignUp/signUp"));
const Home = lazy(() => import("./home_page/home"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/Owner" element={<Owner />} />
          <Route path="/AddPlates" element={<AddPlates/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

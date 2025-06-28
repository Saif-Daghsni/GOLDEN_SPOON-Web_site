import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Owner from "./Owner_page/Owner";

// upload a display photos base 64 successfully
const Login = lazy(() => import("./login/login"));
const Signup = lazy(() => import("./SignUp/signUp"));
const Home = lazy(() => import("./home_page/home"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/Owner" element={<Owner />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

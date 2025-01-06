import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Platform from "./components/Platform";
import JDcreation from "./components/OrganisationComponents/JDcreation";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Popuppreplace from "./components/Popuppreplace";
import SignIn from "./components/SignIn";
import OrganisationSignup from "./components/OrganisationSignup";
import Jobpost from "./components/OrganisationComponents/Jobpost";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/JDcreation" element={<JDcreation />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/Popuppreplace" element={<Popuppreplace/>} />
        <Route path="/OrganisationSignup" element={<OrganisationSignup/>} />
        <Route path="/Jobpost" element={<Jobpost/>} />

      </Routes>
    </>
  );
};

export default App;

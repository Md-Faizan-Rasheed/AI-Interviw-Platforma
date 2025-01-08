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
import Aiquestion from "./components/OrganisationComponents/Aiquestion";
import PreviewAndPublish from "./components/OrganisationComponents/Preview&Publish";
import ProtectedRoute from "./components/OrganisationComponents/ProtectedRoute";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/Popuppreplace" element={<Popuppreplace/>} />
        <Route path="/OrganisationSignup" element={<OrganisationSignup/>} />
        <Route path="/Jobpost" element={<Jobpost/>} />
        <Route path="/Aiquestion" element={<Aiquestion/>} />
        <Route path="/Preview&Publish" element={<PreviewAndPublish/>} />

        {/* <Route path="/JDcreation" element={<JDcreation />} /> */}
        <Route
          path="/JDcreation"
          element={
            <ProtectedRoute>
              <JDcreation />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </>
  );
};

export default App;

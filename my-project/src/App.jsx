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
// import PreviewAndPublish from "./components/OrganisationComponents/PreviewAndPublish";
import { createContext, useReducer } from "react";
// Import reducer, initialState, and init function
import { reducer, initialState } from "../src/Reducer/UserRecducer";
import Protectedroute from "./components/Protectedroute.jsx";
import PreviewAndPublish from "./components/OrganisationComponents/Preview&Publish.jsx";
import Alljobs from "./components/OrganisationComponents/Alljobs.jsx";

// Context API
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/popuppreplace" element={<Popuppreplace />} />
        <Route path="/organisationsignup" element={<OrganisationSignup />} />
        

        {/* protected routes  */}
        <Route element={<Protectedroute/>}>
        <Route path="/jdcreation" element={<JDcreation />} />
        <Route path="/jobpost" element={<Jobpost />} />
        <Route path="/aiquestion" element={<Aiquestion />} />
        <Route path="/preview-and-publish" element={<PreviewAndPublish/>} />
        <Route path="/alljobs" element={<Alljobs/>} />

        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;

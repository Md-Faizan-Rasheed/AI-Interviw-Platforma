import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Platform from "./components/Platform";
import JDcreation from "./components/OrganisationComponents/Dashboard.jsx";
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
import JobDetails from "./components/OrganisationComponents/JobDetails.jsx";
import Dashboard from "./components/OrganisationComponents/Dashboard.jsx";
import Settings from "./components/OrganisationComponents/Setting.jsx";
import ResetPasswordPage from "./components/OrganisationComponents/ResetPasswordPage.jsx";
// import { Settings } from "lucide-react";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import LoginForm from "./components/Login.jsx";
import StudentInfo from "./components/OrganisationComponents/StudentInfo.jsx";
// Context API
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthProvider>
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
        <Route path="/jobs/:id" element={<JobDetails/>} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordPage/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/studentinfo" element={<StudentInfo/>}/>
  
        {/* protected routes  */}
        <Route element={<Protectedroute/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/jobpost" element={<Jobpost />} />
        <Route path="/aiquestion" element={<Aiquestion />} />
        <Route path="/preview-and-publish" element={<PreviewAndPublish/>} />
        <Route path="/alljobs" element={<Alljobs/>} />
        <Route path="/JDcreation" element={<JDcreation/>} />
        <Route path="/setting" element={<Settings/>} />

      </Route>
      </Routes>
    </UserContext.Provider>
    </AuthProvider>
  );
};

export default App;

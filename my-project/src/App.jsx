import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Platform from "./components/Platform";
import JDcreation from "./components/OrganisationComponents/Dashboard.jsx";
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
import InterviewPage from "./components/OrganisationComponents/InterviewPage.jsx";
import LayoutWithNavbar from "./components/LayoutWithNavbar";
import RecentInterviews from "./components/OrganisationComponents/RecentInterviews.jsx";
import StudentSignup from "./components/StudentsComponents/StudentSignup.jsx";
import StudentSignin from "./components/StudentsComponents/StudentSignin.jsx";
import StudentHomePage from "./components/StudentsComponents/StudentHomePage.jsx";
import StudentInterviewPage from "./components/StudentsComponents/StudentInterviewPage.jsx";
import ContactUsPage from "./components/OrganisationComponents/ContactUsPage.jsx";
import PricingPage from "./components/OrganisationComponents/PricingPage.jsx";
// Context API
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthProvider>
      <UserContext.Provider value={{ state, dispatch }}>
      {/* <Navbar /> */}
     <Routes>

  {/* ❌ NO NAVBAR */}
  <Route path="/studentinfo/:id" element={<StudentInfo />} />
  <Route path="/interview/:id" element={<InterviewPage />} />
  <Route path="/jobs/:id" element={<JobDetails />} />
  <Route path="/StudentSignup" element={<StudentSignup />} />
    <Route path="/StudentSignin" element={<StudentSignin />} />
   <Route path="/StudentHomePage/:studentId" element={<StudentHomePage />} />
    <Route path="/StudentInterviewPage/:studentId" element={<StudentInterviewPage />} />



  {/* ✅ WITH NAVBAR */}
  <Route element={<LayoutWithNavbar />}>

    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/platform" element={<Platform />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/popuppreplace" element={<Popuppreplace />} />
    <Route path="/organisationsignup" element={<OrganisationSignup />} />
    <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
    <Route path="/login" element={<LoginForm />} /> 
    <Route path="/PricingPage" element={<PricingPage />} />
    <Route path="/ContactUsPage" element={<ContactUsPage />} />
    
   
    {/* 🔐 Protected */}
    <Route element={<Protectedroute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobpost" element={<Jobpost />} />
      <Route path="/aiquestion" element={<Aiquestion />} />
      <Route path="/preview-and-publish" element={<PreviewAndPublish />} />
      <Route path="/alljobs" element={<Alljobs />} />
      <Route path="/JDcreation" element={<JDcreation />} />
      <Route path="/setting" element={<Settings />} />
      <Route  path="/RecentInterviews" element={<RecentInterviews/>}/>
    </Route>

  </Route>
</Routes>
    </UserContext.Provider>
    </AuthProvider>
  );
};

export default App;

{/* 🔐 Protected 
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
        {/* <Route path="/studentinfo" element={<StudentInfo/>}/> */}
//         <Route path="/studentinfo/:id" element={<StudentInfo />} />
//         <Route path="/interview/:id" element={<InterviewPage/>}/>
  
//         {/* protected routes  */}
//         <Route element={<Protectedroute/>}>
//         <Route path="/dashboard" element={<Dashboard/>} />
//         <Route path="/jobpost" element={<Jobpost />} />
//         <Route path="/aiquestion" element={<Aiquestion />} />
//         <Route path="/preview-and-publish" element={<PreviewAndPublish/>} />
//         <Route path="/alljobs" element={<Alljobs/>} />
//         <Route path="/JDcreation" element={<JDcreation/>} />
//         <Route path="/setting" element={<Settings/>} />

//       </Route>
//       </Routes>

//  */}
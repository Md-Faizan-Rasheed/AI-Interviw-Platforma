// components/LayoutWithNavbar.jsx
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutWithNavbar;

import { NavLink } from 'react-router-dom';

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-green-600 text-white rounded-lg px-4 py-2"
          : "text-gray-600 hover:text-green-600"
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;

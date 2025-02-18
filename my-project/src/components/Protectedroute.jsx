import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
function Protectedroute() {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protectedroute;

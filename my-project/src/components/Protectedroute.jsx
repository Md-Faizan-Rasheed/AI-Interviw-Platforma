import { useContext } from 'react';
import { UserContext } from "../App";
import { Navigate, Outlet } from 'react-router-dom';

function Protectedroute() {
    const { state } = useContext(UserContext);

    return state ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protectedroute;

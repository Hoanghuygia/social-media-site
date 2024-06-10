import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoutes = (props) =>{
    const user = props.name;
    return user ? null : <Navigate to="/login" />
}

export default ProtectedRoutes;
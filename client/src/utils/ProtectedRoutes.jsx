import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoutes = (props) =>{
    const user = props.name;
    return user ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';



const ProtectedRoutes = () =>{
    const user = Cookies.get('user');
    console.log(user);
    return (user=="true") ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;
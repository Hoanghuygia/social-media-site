import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login(props) {

    const setUser = props.setUser;
    const style = {
        backgroundColor: "rgb(254, 249, 248)"
    }

    return(
        <>
            <div className="min-w-screen  min-h-screen	w-auto	h-auto " style={style}>
                <LoginForm setUser={setUser} />           
                <img src="/img/Logo.png" alt="Picture of creature" className="absolute w-1/3 right-28 top-14" />
                <img src="/img/Star.png" alt="Picture of star" className="absolute h-screen	top-0" /> 
                <img src="/img/Rectangle.png" alt="Picture of 3 creature hold star" className="absolute w-1/5 left-1/3 bottom-0" />   
            </div>     
        </>
    );
}

export default Login;
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import LoginForm from "./LoginForm";
import SigninForm from "./SigninForm";
import "./Login.css"
import { useState } from "react";

function LoginPage(props){

    const [Signin, setSignin] = useState(false)
    
    const setLogin = props.Login;
    const Login = () => {
        setLogin(true);
    }
    if (Signin)
        return(
            <>
                <div className="page">
                    <SigninForm Signin = {setSignin} />
                    <img src="/img/Sugarcube.png" alt="Picture of creature and word" className="sugar" />
                </div>
            </>
        );
    else
        return(
            <>
                <div className="page">
                    <LoginForm Login = {Login} Signin={setSignin} />           
                    <img src="/img/Logo.png" alt="Picture of creature" className="logo" />
                    <img src="/img/Star.png" alt="Picture of star" className="star" /> 
                    <img src="/img/Rectangle.png" alt="Picture of 3 creature hold star" className="rectangle" />   
                </div>     
            </>
        );
}
export default LoginPage
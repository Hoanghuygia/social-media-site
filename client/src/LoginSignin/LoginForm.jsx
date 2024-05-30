import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import "./Login.css";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";



function LoginForm(props){

    const setSignin = props.Signin;
    const Singin = () => {
        setSignin(true);
    }
    
    const setLogin = props.Login;
    const Login = () => {
        setLogin(true);
    }

    return(
        <>
            {/* <h1>Login</h1>
            <button onClick={Login}>Login</button> */}
            <div className="formLogin">
                <form action="" onSubmit={Login}>
                    <div className="inputbox">
                        <input type="text" placeholder="Email or phone number" />
                        <FaRegUser className="icon" />
                    </div>

                    <div className="inputbox">
                        <input type="password" placeholder="Password" />
                        <CiLock className="icon" />
                    </div>

                    <button type="submit">Log in</button>

                    <div className="orLogIn">
                        Or log in with
                    </div>

                    <div className="loginWithIcon">
                        <AiFillInstagram />
                        <FaFacebook className="Facebook" />
                        <AiFillTwitterCircle />
                    </div>
                    
                    
                    <div className="SigninLink">
                        <p>
                            Don't have an account? &nbsp;
                            <a onClick={Singin}>Sign in</a>
                        </p>
                    </div>

                    
                </form>
            </div>
        </>
    )
}
export default LoginForm
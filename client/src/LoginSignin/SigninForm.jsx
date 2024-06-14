import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import "./Login.css";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";



function SigninForm(props){

    const setSignin = props.Signin;
    const Singin = () => {
        setSignin(false);
    }
    

    return(
        <>
            {/* <h1>Login</h1>
            <button onClick={Login}>Login</button> */}
            <div className="formSignin">
                <form action="" onSubmit={Singin}>
                    <div className="attribute">
                        <div className="SigninLink">
                            <p>
                                Sign in to share your sweet with
                            </p>
                        </div>

                        <div className="signinWithIcon">
                            <AiFillInstagram />
                            <FaFacebook className="Facebook" />
                            <AiFillTwitterCircle />
                        </div>

                        <div className="orSignIn">
                            Or
                        </div>
                        
                        <div className="inputbox">
                            <input type="text" placeholder="Email or phone number" />
                        </div>

                        <div className="inputbox">
                            <input type="text" placeholder="Fullname" />
                        </div>

                        <div className="inputbox">
                            <input type="text" placeholder="Username" />
                        </div>

                        <div className="inputbox">
                            <input type="password" placeholder="Password" />
                        </div>


                    </div>

                    <button type="submit">Sign in</button>
                    
                </form>
            </div>
        </>
    )
}
export default SigninForm
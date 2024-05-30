import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import {useState, useEffect } from 'react';



function SigninForm(props){

    const stylefont = {
        fontFamily: "Inter",
        background: "#fef9f8"
    }
    const colorOr = {
        color: "#A3A3A3"
    }
    const colorButton = {
        color: "#555555"
    }
    const colorSigin = {
        color: "#7F7F7F"
    }

    const navigate = useNavigate();

    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (err) => {
        err.preventDefault();
        setIsSubmit(true);
    }

    useEffect(() => {
        if (isSubmit) {
            return (navigate('/login'));
        }
    });
    
    return(
        <>
            <div className="flex absolute right-32 top-10 w-1/3 h-full rounded-3xl p-0" style={stylefont}>
                <form action="" className="w-full h-full" onSubmit={handleSubmit}>
                    <div className="rounded-3xl shadow-xl">
                        <div className="text-center	text-2xl font-bold pt-9" style={colorSigin}>
                            <p>
                                Sign in to share your sweet with
                            </p>
                        </div>

                        <div className="flex relative items-center justify-center top-9 -translate-y-1/2 text-5xl">
                            <AiFillInstagram />
                            <FaFacebook className="ml-11 mr-11" />
                            <AiFillTwitterCircle />
                        </div>

                        <div className="flex items-center text-center font-bold text-xl mt-7 mb-9" style={colorOr}>
                            <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                            Or log in with
                            <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                        </div>
                        
                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto mb-5">
                            <input type="text" placeholder="Email or phone number" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" />
                        </div>

                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto mb-5">
                            <input type="text" placeholder="Fullname" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" />
                        </div>

                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto mb-5">
                            <input type="text" placeholder="Username" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" />
                        </div>

                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto pb-10">
                            <input type="password" placeholder="Password" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400"/>
                        </div>


                    </div>

                    <button type="submit" className="block relative w-4/5 h-16 ml-auto mr-auto mt-10 border-none 
                        outline-none cursor-pointer rounded-full text-2xl font-bold bg-rose-200 hover:bg-rose-300" style={colorButton}>
                            Sign in
                    </button>
                    
                </form>
            </div>
        </>
    )
}
export default SigninForm
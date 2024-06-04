import { FaRegUser } from "react-icons/fa";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {useState, useEffect } from 'react';




function LoginForm() {

    const StyledNavLink = styled(NavLink)``;

    const navigate = useNavigate();

    const [isSubmit, setIsSubmit] = useState(false);
    const [passwordShown, setPasswordShowen] = useState(false);
    const [lockShowen, setLockShowen] = useState(false);

    const handleSubmit = (err) => {
        err.preventDefault();   
        setIsSubmit(true);
    }

    const togglePassword = () => {
        setPasswordShowen(!passwordShown);
        toggleLock();
    }
    const toggleLock = () => {
        setLockShowen(!lockShowen);
    }
    const CustomIcon = (lockShowen) ? MdLockOpen : MdLockOutline;

    useEffect(() => {
        if (isSubmit) {
            return (navigate('/'));
        }
    });

    return (
        <>
            <div className="flex absolute right-32 top-20 pt-4 w-1/3 h-4/5 rounded-3xl p-0 shadow-2xl font-inter bg-[#fef9f8]">
                <form action="" className="w-full h-full pt-20" onSubmit={handleSubmit}>
                    <div className="relative w-11/12 h-1/12 ml-auto mr-auto mb-5">
                        <input type="text" placeholder="Email or phone number" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400"/>
                        <FaRegUser className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.8rem] text-[#959595]"/>
                    </div>

                    <div className="relative w-11/12 h-1/12 ml-auto mr-auto">
                        <input type={passwordShown ? 'text' : 'password'} placeholder="Password" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" />
                        <CustomIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-[#959595]" onClick={togglePassword} />
                    </div>

                    <button type="submit" className="block relative w-2/5 h-11 ml-auto mr-auto mt-14 border-none 
                        outline-none cursor-pointer rounded-full text-xl bg-rose-200 hover:bg-rose-300 text-[#555555]">
                            Log in
                    </button>

                    <div className="flex items-center text-center font-bold text-xl mt-5 text-[#A3A3A3]">
                        <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                        Or log in with
                        <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                    </div>

                    <div className="flex relative items-center justify-center top-9 -translate-y-1/2 text-5xl">
                        <AiFillInstagram />
                        <FaFacebook className="ml-11 mr-11 text-[94%]" />
                        <AiFillTwitterCircle />
                    </div>


                    <div className="text-center text-xl font-semibold mt-24 text-[#7F7F7F]">
                        <p>
                            Don't have an account? &nbsp;
                            <StyledNavLink className="text-xl font-bold cursor-pointer text-[#9D6567]" to="/signup">Sign in</StyledNavLink>
                        </p>
                    </div>


                </form>
            </div>
        </>
    )
}
export default LoginForm
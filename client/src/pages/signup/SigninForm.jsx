import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";


function SigninForm(props){


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

    const intialValues = { username: "", email: "", password: ""};

    const [formValues, setFormValues] = useState(intialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (err) => {
        err.preventDefault();
        if(!formValues.email && !formValues.username && !formValues.password){
            console.log("error");
        }
        else{
            try{
                
                const response = await fetch('https://sugar-cube.onrender.com/register', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formValues.username,
                        email: formValues.email,
                        password: formValues.password
                    })
                });
                console.log(response);
        
                if(response.ok){
                    console.log("sign up successfully");
                    setIsSubmit(true);
                }
                else{
                    throw new Error("Could not fetch resource");
                }
            }
            catch(error){
                console.error(error);
            }
        }
    }
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    }

    useEffect(() => {
        console.log(formValues);
        if (isSubmit) {
            return (navigate('/login'));
        }
    });
    
    return(
        <>
            <div className="flex absolute right-32 pt-10 w-1/3 h-full rounded-3xl p-0 font-inter bg-[#fef9f8]">
                <form action="" className="w-full h-full" onSubmit={handleSubmit}>
                    <div className="rounded-3xl shadow-xl">
                        <div className="text-center	text-2xl font-bold pt-9" style={colorSigin}>
                            <p>
                                Sign in to share your sweet with
                            </p>
                        </div>

                        <div className="flex relative items-center justify-center top-9 -translate-y-1/2 text-5xl">
                            <AiFillInstagram />
                            <FaFacebook className="ml-11 mr-11 text-[94%]" />
                            <AiFillTwitterCircle />
                        </div>

                        <div className="flex items-center text-center font-bold text-xl mt-7 mb-5" style={colorOr}>
                            <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                            Or log in with
                            <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                        </div>
                        
                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto mb-5">
                            <input type="text" id="email" placeholder="Email" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" 
                            onChange={handleChange} />
                        </div>

                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto mb-5">
                            <input type="text" placeholder="Fullname" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" />
                        </div>

                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto mb-5">
                            <input type="text" id="username" placeholder="Username" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400" 
                            onChange={handleChange}/>
                        </div>

                        <div className="relative w-10/12 h-1/12 ml-auto mr-auto pb-8">
                            <input type="password" id="password" placeholder="Password" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-5 pl-7 pr-5 pb-5 shadow-inner shadow-gray-400"
                            onChange={handleChange}/>
                        </div>

                        <div className="relative w-10/12 h-[2%] ml-auto mr-auto pb-4 text-center">
                            <NavLink className="text-xl font-bold cursor-pointer text-[#7F7F7F]" to="/login">Back to login</NavLink>
                        </div>


                    </div>

                    <button type="submit" className="block relative w-4/5 h-16 ml-auto mr-auto mt-6 border-none 
                        outline-none cursor-pointer rounded-full text-2xl font-bold bg-rose-200 hover:bg-rose-300" style={colorButton}>
                            Sign in
                    </button>
                    
                </form>
            </div>
        </>
    )
}
export default SigninForm
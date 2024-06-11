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

    const intialValues = { firstname: "", lastname: "", username: "", email: "", password: "", day: "1", month: "1", year: "1990", gender: ""};

    const [formValues, setFormValues] = useState(intialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (err) => {
        err.preventDefault();
        if(!formValues.email || !formValues.username || !formValues.password || !formValues.firstname || !formValues.lastname || !formValues.gender){
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
                        firstname: formValues.firstname,
                        lastname : formValues.lastname,
                        username: formValues.username,
                        email: formValues.email,
                        password: formValues.password,
                        dob: formValues.day+"-"+formValues.month+"-"+formValues.year,
                        gender: formValues.gender,
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

    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const years = Array.from({ length: 34 }, (_, index) => index + 1990);
    
    return(
        <>
            <div className="flex absolute right-32 pt-10 w-1/3 h-full rounded-3xl p-0 font-inter bg-[#fef9f8]">
                <form action="" className="w-full h-full" onSubmit={handleSubmit}>
                    <div className="rounded-3xl shadow-xl">
                        <div className="text-center	text-xl font-bold pt-5" style={colorSigin}>
                            <p>
                                Sign in to share your sweet with
                            </p>
                        </div>

                        <div className="flex relative items-center justify-center mt-7 -translate-y-1/2 text-[240%]">
                            <AiFillInstagram />
                            <FaFacebook className="ml-11 mr-11 text-[94%]" />
                            <AiFillTwitterCircle />
                        </div>

                        <div className="flex items-center text-center font-bold text-xl mb-5" style={colorOr}>
                            <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                            Or log in with
                            <span className="flex-1	border-b border-solid border-black ml-5	mr-5"></span>
                        </div>

                        <div className="relative w-full text-center">
                            <div className="relative inline-block w-[41%] ml-auto mr-auto mb-4">
                                <input onChange={handleChange} id="firstname" type="text" placeholder="First name" className="placeholder:font-bold placeholder:text-slate-400 
                                w-full h-[10%] bg-white border-none outline-none rounded-full pt-4 pl-7 pr-5 pb-4 shadow-inner shadow-gray-400" />
                            </div>
                            <span className="relative inline-block w-[1%]"></span>
                            <div className="relative inline-block w-[41%] ml-auto mr-auto mb-4">
                                <input onChange={handleChange} id="lastname" type="text" placeholder="Last name" className="placeholder:font-bold placeholder:text-slate-400 
                                w-full h-full bg-white border-none outline-none rounded-full pt-4 pl-7 pr-5 pb-4 shadow-inner shadow-gray-400" />
                            </div>
                        </div>
                        
                        <div className="relative w-10/12 ml-auto mr-auto mb-4">
                            <input type="text" id="username" placeholder="Username" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-4 pl-7 pr-5 pb-4 shadow-inner shadow-gray-400" 
                            onChange={handleChange} />
                        </div>

                        <div className="relative w-10/12 ml-auto mr-auto mb-4">
                            <input type="text" id="email" placeholder="Email" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-4 pl-7 pr-5 pb-4 shadow-inner shadow-gray-400" 
                            onChange={handleChange}/>
                        </div>

                        <div className="relative w-10/12 ml-auto mr-auto mb-4">
                            <input type="text" id="password" placeholder="Password" className="placeholder:font-bold placeholder:text-slate-400 
                            w-full h-full bg-white border-none outline-none rounded-full pt-4 pl-7 pr-5 pb-4 shadow-inner shadow-gray-400" 
                            onChange={handleChange}/>
                        </div>

                        <div className="relative w-full text-center mb-3">
                            <span className="font-semibold text-slate-400 text-lg mr-2">Date of Birth: </span>
                            <div className="relative inline-block w-[12.5%] ml-auto mr-auto">
                                <select onChange={handleChange} id="day" className="appearance-auto font-bold text-slate-400 
                                w-full h-full bg-white border-none outline-none rounded-full pt-2 pl-2 pr-1 pb-2 shadow-inner shadow-gray-400">
                                    {days.map((days) => (
                                    <option key={days} value={days}>
                                        {days}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <span className="font-semibold text-slate-400 text-lg"> / </span>
                            <div className="relative inline-block w-[12.5%] ml-auto mr-auto">
                                <select onChange={handleChange} id="month" className="appearance-auto font-bold text-slate-400 
                                w-full h-full bg-white border-none outline-none rounded-full pt-2 pl-2 pr-1 pb-2 shadow-inner shadow-gray-400">
                                    {months.map((months) => (
                                    <option key={months} value={months}>
                                        {months}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <span className="font-semibold text-slate-400 text-lg"> / </span>
                            <div className="relative inline-block w-[17.5%] ml-auto mr-auto">
                                <select onChange={handleChange} id="year" className="appearance-auto font-bold text-slate-400 
                                w-full h-full bg-white border-none outline-none rounded-full pt-2 pl-2 pr-1 pb-2 shadow-inner shadow-gray-400">
                                    {years.map((years) => (
                                    <option key={years} value={years}>
                                        {years}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="relative w-full text-center text-lg text-slate-400 mb-5">
                            <span className="font-semibold mr-4">Gender: </span>
                            <div className="relative inline-block w-[19%] ml-auto mr-auto">
                                <label className="mr-1">Male
                                <input onChange={handleChange} type="radio" id="gender" name="gender" className="ml-1" value="male"/>
                                </label>
                            </div>

                            <div className="relative inline-block w-[19%] ml-auto mr-auto">
                                <label className="mr-1">Female
                                <input onChange={handleChange} type="radio" id="gender" name="gender" className="ml-1" value="female"/>
                                </label>
                            </div>

                            <div className="relative inline-block w-[19%] ml-auto mr-auto">
                                <label>Other
                                <input onChange={handleChange} type="radio" id="gender" name="gender" className="ml-1" value="other"/>
                                </label>
                            </div>
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
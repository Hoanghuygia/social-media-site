import { useState, useRef, useEffect } from "react";
import avatar from "./../../../public/img/avatar.png";
import { PiVideoBold } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";

const data1 = [
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas labore, vitae exercitationem debitis corrupti, quaerat sunt ducimus natus ea quo qui, illo sint nostrum neque. Hic, odio eum! Illo, totam!"
    },
    {
        ava: "/img/avatar.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
];

const data2 = [
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas labore, vitae exercitationem debitis corrupti, quaerat sunt ducimus natus ea quo qui, illo sint nostrum neque. Hic, odio eum! Illo, totam!"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
];

const FollowInfor = ({ isFollowers, isFollowings, handleClose }) => {

    if (!isFollowers && !isFollowings) return null;

    if(isFollowers)
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-pastel-pink-100 p-3 rounded-3xl h-3/4 w-1/3 relative">
                <button
                type="button"
                className="bg-gray-300 text-white text-lg px-[9px] pb-[0.1rem] rounded-full hover:bg-gray-400 absolute right-3"
                onClick={handleClose}
                >
                &times;
                </button>
                <div className="flex flex-row pt-10">
                <div className="h-0.5 bg-gray-300 w-full" />
                </div>
                <div className="h-[93%] w-full overflow-auto overscroll-auto">
                    {data1.map((data, index) => ( 
                        <div className="flex justify-start items-center gap-3 pt-3 px-5 h-[13%]">
                        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                            src={data.ava}
                            alt="avatar"
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col h-full w-[60%] overflow-hidden">
                            <p className="font-inter tracking-wider font-medium text-lg">
                            {data.name}
                            </p>
                            <p className="font-inter tracking-wider font-medium text-sm text-gray-600">
                            {data.descri}
                            </p>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        );


    if(isFollowings)
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-pastel-pink-100 p-3 rounded-3xl h-3/4 w-1/3 relative">
                <button
                type="button"
                className="bg-gray-300 text-white text-lg px-[9px] pb-[0.1rem] rounded-full hover:bg-gray-400 absolute right-3"
                onClick={handleClose}
                >
                &times;
                </button>
                <div className="flex flex-row pt-10">
                <div className="h-0.5 bg-gray-300 w-full" />
                </div>
                <div className="h-[93%] w-full overflow-auto overscroll-auto">
                    {data2.map((data, index) => ( 
                        <div className="flex justify-start items-center gap-3 pt-3 px-5 h-[13%]">
                        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                            src={data.ava}
                            alt="avatar"
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col h-full w-[60%] overflow-hidden">
                            <p className="font-inter tracking-wider font-medium text-lg">
                            {data.name}
                            </p>
                            <p className="font-inter tracking-wider font-medium text-sm text-gray-600">
                            {data.descri}
                            </p>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        );
};

export default FollowInfor;

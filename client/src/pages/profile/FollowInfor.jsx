import { useState, useEffect } from "react";
import Cookies from 'js-cookie';


const fetchFollowingsData = async () => {
    const username = Cookies.get("username");
    console.log(username)
    try {
        const token = Cookies.get("token");
        const response = await fetch(`https://sugar-cube.onrender.com/user/${username}/followings`, {
            headers: {
                'Authorization': `Bearer ${token}` // Example of adding an authorization header
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

const fetchFollowersData = async () => {
    const username = Cookies.get("username");
    console.log(username)
    try {
        const token = Cookies.get("token");
        const response = await fetch(`https://sugar-cube.onrender.com/user/${username}/followers`, {
            headers: {
                'Authorization': `Bearer ${token}` // Example of adding an authorization header
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};


const FollowInfor = ({ isFollowers, isFollowings, handleClose }) => {

    const [dataFollowings, setDataFollowings] = useState(null);
    const [dataFollowers, setDataFollowers] = useState(null);
    useEffect(() => {

        const fetchDataFollowings = async () => {
            const data = await fetchFollowingsData();
            console.log(data);
            setDataFollowings(data);
        };
        const fetchDataFollowers = async () => {
            const data = await fetchFollowersData();
            console.log(data);
            setDataFollowers(data);
        };
        fetchDataFollowings();
        fetchDataFollowers();

    }, []);

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
                    {dataFollowers.map((data, index) => ( 
                        <div key={index} className="flex justify-start items-center gap-3 pt-3 px-5 h-[13%]">
                            <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
                                <img
                                src="/img/avatar.png"
                                alt="avatar"
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full w-[60%] overflow-hidden justify-center">
                                <p className="font-inter tracking-wider font-medium text-xl">
                                {data.follower_id}
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
                    {dataFollowings.map((data, index) => ( 
                        <div key={index} className="flex justify-start items-center gap-3 pt-3 px-5 h-[13%]">
                            <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
                                <img
                                src="/img/avatar.png"
                                alt="avatar"
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full w-[60%] overflow-hidden justify-center">
                                <p className="font-inter tracking-wider font-medium text-xl">
                                {data.following_id.username}
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

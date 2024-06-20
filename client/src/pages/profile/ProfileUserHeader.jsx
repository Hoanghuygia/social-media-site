import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "./../../assets/img/Banner.png";
import avatar from "./../../../public/img/avatar.png";
import FollowInfor from "./FollowInfor";
import Cookies from "js-cookie";

const fetchFollowingsData = async (username) => {
    try {
        const token = Cookies.get("token");
        const response = await fetch(
            `https://sugar-cube.onrender.com/user/${username}/followings`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Example of adding an authorization header
                },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

const fetchFollowersData = async (username) => {
    try {
        const token = Cookies.get("token");
        const response = await fetch(
            `https://sugar-cube.onrender.com/user/${username}/followers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Example of adding an authorization header
                },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

const fetchFollow = async (user, following_id) => {
    try {
        const token = Cookies.get("token");
        const response = await fetch(
            `https://sugar-cube.onrender.com/user/${user}/followings`,
            {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Example of adding an authorization header
                },
                body: JSON.stringify({
                    following_id: following_id,
                }),
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

const fetchUserData = async (username) => {
    try {
        const token = Cookies.get("token");
        const response = await fetch(
            `https://sugar-cube.onrender.com/user/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Example of adding an authorization header
                },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

const ProfileUserHeader = ({ username }) => {
    const user = localStorage.username;
    const [name, setName] = useState();
    const [isFollowers, setIsFollowers] = useState(false);
    const [isFollowings, setIsFollowings] = useState(false);
    const [dataFollowings, setDataFollowings] = useState([]);
    const [dataFollowers, setDataFollowers] = useState([]);
    const [userData, setUserData] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const handleFollowers = () => {
        setIsFollowers(true);
    };
    const handleFollowing = () => {
        setIsFollowings(true);
    };
    const handleClose = () => {
        setIsFollowings(false);
        setIsFollowers(false);
    };

    const handleButtonClick = () => {
        console.log(userData._id);
        if (!isClicked) {
            fetchFollow(user, userData._id);
        }
        setIsClicked(true);
    };

    useEffect(() => {
        const fetchIfFollow = async () => {
            const data = await fetchFollowingsData(user);
            data.forEach((item) => {
                if (item.following_id.username === username) {
                    handleButtonClick();
                }
            });
        };
        const fetchUser = async () => {
            const data = await fetchUserData(username);
            setName(data.firstName + " " + data.lastName);
            console.log(data);
            setUserData(data);
        };
        const fetchDataFollowers = async () => {
            const data = await fetchFollowersData(username);
            setDataFollowers(data);
        };
        const fetchDataFollowings = async () => {
            const data = await fetchFollowingsData(username);
            setDataFollowings(data);
        };
        fetchUser();
        fetchDataFollowers();
        fetchDataFollowings();
        fetchIfFollow();
    }, []);

    return (
        <>
            <FollowInfor
                isFollowers={isFollowers}
                isFollowings={isFollowings}
                handleClose={handleClose}
                dataFollowers={dataFollowers}
                dataFollowings={dataFollowings}
            />
            <div className="w-full relative font-inter">
                <div className=" bg-white h-72 ">
                    <img
                        src={userData.coverPicture || BannerImage}
                        alt="Profile Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="flex justify-end py-4 px-10">
                        <button
                            onClick={handleButtonClick}
                            className="bg-pastel-pink-200 z-10 rounded-xl py-2 px-3 flex flex-row gap-1 font-medium shadow-sm shadow-pastel-pink-300 hover:bg-pastel-pink-300 hover:shadow-inner"
                            style={{
                                backgroundColor: isClicked
                                    ? "#fae1e7"
                                    : "#efd1d8",
                            }}
                        >
                            {isClicked ? "Followed" : "Follow"}
                        </button>
                    </div>

                    <div className="relative w-full text-center mt-10">
                        <div className="inline-block cursor-pointer">
                            <span className="inline-block text-xl font-semibold text-[#5c5c5c]">
                                0
                            </span>
                            <span className="inline-block text-lg text-[#969696] ml-2">
                                Posts
                            </span>
                        </div>
                        <div
                            className="inline-block ml-20 mr-20 cursor-pointer "
                            onClick={handleFollowers}
                        >
                            <span className="inline-block text-xl font-semibold text-[#5c5c5c]">
                                {dataFollowers.length}
                            </span>
                            <span className="inline-block text-lg text-[#969696] ml-2 underline-offset-4 hover:underline">
                                Followers
                            </span>
                        </div>
                        <div
                            className="inline-block cursor-pointer"
                            onClick={handleFollowing}
                        >
                            <span className="inline-block text-xl font-semibold text-[#5c5c5c]">
                                {dataFollowings.length}
                            </span>
                            <span className="inline-block text-lg text-[#969696] ml-2 underline-offset-4 hover:underline">
                                Followings
                            </span>
                        </div>
                    </div>
                    <div className="absolute top-[20%] h-full w-full">
                        <div className="translate-y-1/2 flex flex-col items-center justify-center">
                            <div className="relative w-[175px] h-[175px] rounded-full overflow-hidden border-[6px] border-pastel-pink-100">
                                <img
                                    src={userData.profilePicture || avatar}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="relative font-bold justify-between pt-2 text-center text-3xl text-gray-600 font-inter tracking-widest">
                                <div>{name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileUserHeader;

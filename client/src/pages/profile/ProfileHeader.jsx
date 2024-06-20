import {
  Avatar,
  Center,
  Heading,
  Text,
  Flex,
  Box,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "./../../assets/img/Banner.png";
import avatar from "./../../../public/img/avatar.png"; // Default avatar
import { TbUserEdit } from "react-icons/tb";
import FollowInfor from "./FollowInfor";
import Cookies from 'js-cookie';
import uploadImage from "../../utils/uploadImage"; // Import the uploadImage utility function

const fetchFollowingsData = async (username) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`https://sugar-cube.onrender.com/user/${username}/followings`, {
      headers: {
        'Authorization': `Bearer ${token}`
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

const fetchFollowersData = async (username) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`https://sugar-cube.onrender.com/user/${username}/followers`, {
      headers: {
        'Authorization': `Bearer ${token}`
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

const fetchUserData = async (username) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`https://sugar-cube.onrender.com/user/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
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

const fetchUserPosts = async (userId) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`https://sugar-cube.onrender.com/post/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with fetching user posts:", error);
    return [];
  }
};

const updateUserData = async (username, data) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`https://sugar-cube.onrender.com/user/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was a problem with the update operation:", error);
  }
};


const ProfileHeader = () => {
  const user = localStorage.username;
  const userId = localStorage.userId; // Assuming you have userId stored in localStorage
  const [isFollowers, setIsFollowers] = useState(false);
  const [isFollowings, setIsFollowings] = useState(false);
  const [dataFollowings, setDataFollowings] = useState([]);
  const [dataFollowers, setDataFollowers] = useState([]);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

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

  const handleEditProfile = () => {
    navigate("/profile/detail");
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        await updateUserData(user, { profilePicture: url });
        setUserData((prev) => ({ ...prev, profilePicture: url }));
      } catch (error) {
        console.error("Avatar upload failed: ", error);
      }
    }
  };

  const handleCoverChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        await updateUserData(user, { coverPicture: url });
        setUserData((prev) => ({ ...prev, coverPicture: url }));
      } catch (error) {
        console.error("Cover upload failed: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchDataFollowers = async () => {
      const data = await fetchFollowersData(user);
      console.log(data);
      setDataFollowers(data);
    };
    
    const fetchDataFollowings = async () => {
      const data = await fetchFollowingsData(user);
      console.log(data);
      setDataFollowings(data);
    };
    
    const fetchUser = async () => {
      const data = await fetchUserData(user);
      console.log(data);
      setUserData(data);
    };
    
    const fetchPosts = async () => {
      const posts = await fetchUserPosts(userId);
      console.log(posts);
      setUserPosts(posts);
    };

    fetchDataFollowers();
    fetchDataFollowings();
    fetchUser();
    fetchPosts();
  }, [user, userId]);

  return (
    <>
      <FollowInfor
        isFollowers={isFollowers}
        isFollowings={isFollowings}
        handleClose={handleClose}
        dataFollowers={dataFollowers}
        dataFollowings={dataFollowings}
        userData={user}
      />
      <div className="w-full relative font-inter">
        <div className="bg-white h-72 relative group">
          <img
            src={userData.coverPicture || BannerImage}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            id="cover-input"
            className="hidden"
            onChange={handleCoverChange}
          />
          <label
            htmlFor="cover-input"
            className="absolute top-2 z-50 right-2 bg-gray-800 bg-opacity-50 font-inter text-white text-sm py-1 px-2 rounded-xl cursor-pointer opacity-0 hover:opacity-100"
          >
            Edit Cover
          </label>
          <div className="flex justify-end py-4 px-10">
            <button
              onClick={handleEditProfile}
              className="bg-pastel-pink-200 z-10 rounded-xl py-2 px-3 flex flex-row gap-1 font-medium shadow-sm shadow-pastel-pink-300 hover:bg-pastel-pink-300 hover:shadow-inner"
            >
              Edit Profile
              <TbUserEdit className="h-5 w-5" />
            </button>
          </div>
          <div className="relative w-full text-center mt-10">
            <div className="inline-block cursor-pointer">
              <span className="inline-block text-xl font-semibold text-[#5c5c5c]">{userPosts.length}</span>
              <span className="inline-block text-lg text-[#969696] ml-2">Posts</span>
            </div>
            <div className="inline-block ml-20 mr-20 cursor-pointer" onClick={handleFollowers}>
              <span className="inline-block text-xl font-semibold text-[#5c5c5c]">{dataFollowers.length}</span>
              <span className="inline-block text-lg text-[#969696] ml-2 underline-offset-4 hover:underline">Followers</span>
            </div>
            <div className="inline-block cursor-pointer" onClick={handleFollowing}>
              <span className="inline-block text-xl font-semibold text-[#5c5c5c]">{dataFollowings.length}</span>
              <span className="inline-block text-lg text-[#969696] ml-2 underline-offset-4 hover:underline">Followings</span>
            </div>
          </div>
          <div className="absolute top-[20%] h-full w-full">
            <div className="translate-y-1/2 flex flex-col items-center justify-center">
              <div className="relative w-[175px] h-[175px] rounded-full overflow-hidden border-[6px] border-pastel-pink-100 group">
                <img
                  src={userData.profilePicture || avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  id="avatar-input"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <label
                  htmlFor="avatar-input"
                  className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white font-inter text-xl opacity-0 hover:opacity-100 cursor-pointer"
                >
                  Edit Avatar
                </label>
              </div>
              <div className="relative font-bold justify-between pt-2 text-center text-3xl text-gray-600 font-inter tracking-widest">
                <div>{userData.firstName} {userData.lastName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;




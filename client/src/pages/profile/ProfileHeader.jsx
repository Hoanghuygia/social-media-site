import React from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "./../../assets/img/Banner.png";
import avatar from "./../../../public/img/avatar.png";
import { TbUserEdit } from "react-icons/tb";

const ProfileHeader = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile/detail');
  };

  return (
    <div className="w-full relative">
      <div className=" bg-white h-72 ">
        <img
          src={BannerImage}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="flex justify-end py-4 px-10">
          <button
            onClick={handleEditProfile}
            className='bg-pastel-pink-200 rounded-xl py-2 px-3 flex flex-row gap-1 font-medium shadow-sm shadow-pastel-pink-300 hover:bg-pastel-pink-300 hover:shadow-inner'
          >
            Edit Profile
            <TbUserEdit className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute top-[20%] left-[39%] translate-y-1/2 flex flex-col items-center justify-center">
          <div className="relative w-[175px] h-[175px] rounded-full overflow-hidden border-[6px] border-pastel-pink-100">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative font-bold justify-between pt-2 text-center text-3xl text-gray-600 font-inter tracking-widest">
            <div> Swirl Lollipop</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

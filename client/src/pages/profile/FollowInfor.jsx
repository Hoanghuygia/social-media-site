import { useState, useEffect } from "react";



const FollowInfor = ({ isFollowers, isFollowings, handleClose, dataFollowers, dataFollowings }) => {


    if (!isFollowers && !isFollowings) return null;

    if(isFollowers)
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-pastel-pink-100 p-3 rounded-3xl h-3/4 w-1/3 relative">
                <p className="inline-block font-bold text-2xl pl-5">Followers</p>
                <button
                type="button"
                className="bg-gray-300 text-white text-lg px-[9px] pb-[0.1rem] rounded-full hover:bg-gray-400 absolute right-3"
                onClick={handleClose}
                >
                &times;
                </button>
                <div className="flex flex-row pt-3">
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
                                <p className="font-inter tracking-wider font-medium text-[1.1rem]">
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
                <p className="inline-block font-bold text-2xl pl-5">Followings</p>
                <button
                type="button"
                className="bg-gray-300 text-white text-lg px-[9px] pb-[0.1rem] rounded-full hover:bg-gray-400 absolute right-3"
                onClick={handleClose}
                >
                &times;
                </button>
                <div className="flex flex-row pt-3">
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
                                <p className="font-inter tracking-wider font-medium text-[1.1rem]">
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiRequestPost } from "../utils/helper";
import { setCurrentPage } from "../stores/windowSlice";
import { setReRenderChatlist } from "../stores/messageSlice";
import { useDispatch, } from 'react-redux';
import Cookies from "js-cookie";

function SearchModal({ filteredUsers, setQuery }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUserID = Cookies.get("userId");
    const accessToken = Cookies.get("token");

    const location = useSelector((state) => state.window.currentPage);

    const handleUserClick = async (username, userID) => {
        if (location === "Message") {
            try {
                await apiRequestPost(
                    "https://sugar-cube.onrender.com/user/chatlist",
                    accessToken,
                    {
                        currentUserID,
                        addUserID: userID,
                    }
                );
            } catch (error) {
                console.log("Error when add chatlist: ", error);
                return;
            }
            setQuery('');
            dispatch(setReRenderChatlist(true));
            // setCounter((prev) => prev + 1);
            // window.location.reload();
        } else {
            navigate(`/profile/${username}`);
            dispatch(setCurrentPage("UserPage"));
        }
    }
    
    return (
        <div className="p-4 rounded-lg">
            {filteredUsers.map((user) => (
                <div
                    key={user._id}
                    className="p-2 border-b border-gray-300 cursor-pointer flex items-center"
                    onClick={() => handleUserClick(user.username, user._id)}
                >
                    <img
                        src={user.profilePicture || "/img/avatar.png"}
                        alt={`${user.username}'s avatar`}
                        className="inline-block h-8 w-8 rounded-full mr-2"
                    />
                    <span>
                        {user.username} ({user.firstName} {user.lastName})
                    </span>
                </div>
            ))}
        </div>
    );
}

export default SearchModal;

import React from "react";
import { useNavigate } from "react-router-dom";

function SearchModal({ filteredUsers }) {
    const navigate = useNavigate();

    const handleUserClick = (username) => {
        navigate(`/profile/${username}`);
        window.location.reload();
    };

    return (
        <div className="p-4 rounded-lg">
            {filteredUsers.map(user => (
                <div 
                    key={user._id} 
                    className="p-2 border-b border-gray-300 cursor-pointer flex items-center"
                    onClick={() => handleUserClick(user.username)}
                >
                    <img 
                        src={user.profilePicture || '/img/avatar.png'} 
                        alt={`${user.username}'s avatar`} 
                        className="inline-block h-8 w-8 rounded-full mr-2" 
                    />
                    <span>{user.username} ({user.firstName} {user.lastName})</span>
                </div>
            ))}
        </div>
    );
}

export default SearchModal;

import React, { useRef, useEffect, useState } from "react";
import { FaRegCirclePlay, FaHeart, FaRegCommentDots, FaRegShareFromSquare } from "react-icons/fa6";

export default function Video({ channel, description, url, likes, comment, shares }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isLiked, setIsLiked] = useState(false); // New state to track whether the video is liked
    const vidRef = useRef();

    const onVideoClick = () => {
        if (isVideoPlaying) {
            vidRef.current.pause();
            setIsVideoPlaying(false);
        } else {
            vidRef.current.play();
            setIsVideoPlaying(true);
        }
    };

    const handleSeeMoreClick = (e) => {
        e.stopPropagation(); // Prevent the click from propagating to the video click handler
        setShowFullDescription(!showFullDescription);
    };

    // Function to handle liking the video
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        const scroll = document.getElementById("video-container");

        if (scroll) {
            const handleScroll = () => {
                if (vidRef.current) {
                    vidRef.current.pause();
                    setIsVideoPlaying(false);
                }
            };

            scroll.addEventListener("scroll", handleScroll);

            return () => {
                scroll.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    const isDescriptionLong = description.length > 100; // Define a length to determine if the description is long

    return (
        <div className="relative flex">
            <div className="relative" onClick={onVideoClick}>
                {!isVideoPlaying && (
                    <div className="absolute inset-0 flex justify-center items-center text-white z-10">
                        <FaRegCirclePlay size={70} />
                    </div>
                )}

                <video
                    className="w-full h-screen rounded-xl"
                    ref={vidRef}
                    src={url}
                    loop
                />

                <div className="absolute rounded-xl bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                    <div className="video-text mb-2">
                        <h3 className="text-lg font-inter font-semibold">
                            {channel}
                            <button className="ml-2 px-2 py-1 border border-white rounded font-inter font-medium text-xs text-white" onClick={(e) => e.stopPropagation()}>
                                Follow
                            </button>
                        </h3>
                    </div>

                    <div className="video-text mb-2">
                        <p className="text-lg font-inter text-sm">
                            {showFullDescription || !isDescriptionLong ? description : `${description.substring(0, 100)}...`}
                            {isDescriptionLong && (
                                <button className="ml-2 text-white font-bold font-inter" onClick={handleSeeMoreClick}>
                                    {showFullDescription ? 'See less' : 'See more'}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-end items-end p-5 gap-7 text-white text-lg font-bold font-khumb-sans">
                <div className="flex flex-col items-center">
                    {/* Use FaHeart for the filled heart when liked */}
                    <FaHeart size={32} className={isLiked ? 'fill-red-500 text-white' : ''} onClick={handleLikeClick} />
                    <span>{likes}</span>
                </div>
                <div className="flex flex-col items-center">
                    <FaRegCommentDots size={32} />
                    <span>{comment}</span>
                </div>
                <div className="flex flex-col items-center">
                    <FaRegShareFromSquare size={32} />
                    <span>{shares}</span>
                </div>
            </div>
        </div>
    );
}

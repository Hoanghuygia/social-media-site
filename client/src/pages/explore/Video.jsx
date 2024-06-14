import React, { useRef, useEffect, useState } from "react";
import { FaRegCirclePlay, FaHeart, FaRegCommentDots, FaRegShareFromSquare } from "react-icons/fa6";

export default function Video({ channel, description, url, likes, comment, shares }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isInView, setIsInView] = useState(false); // State to track if video is in view
    const vidRef = useRef(null);

    const handleVideoClick = () => {
        if (isVideoPlaying) {
            vidRef.current.pause();
            setIsVideoPlaying(false);
        } else {
            vidRef.current.play();
            setIsVideoPlaying(true);
        }
    };

    const handleSeeMoreClick = (e) => {
        e.stopPropagation();
        setShowFullDescription(!showFullDescription);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        setIsVideoPlaying(true);
                        vidRef.current.play();

                    } else {
                        setIsInView(false);
                    }
                });
            },
            { threshold: 0.75 } // Adjust threshold as needed
        );

        if (vidRef.current) {
            observer.observe(vidRef.current);
        }

        return () => {
            if (vidRef.current) {
                observer.unobserve(vidRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Pause video if it goes out of view
        if (!isInView && isVideoPlaying) {
            vidRef.current.pause();
            setIsVideoPlaying(false);
        }
    }, [isInView]);

    const isDescriptionLong = description.length > 100;

    return (
        <div className="relative flex">
            <div className="relative" onClick={handleVideoClick}>
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

            <div className="flex flex-col justify-end items-end p-5 gap-7 text-pastel-pink-300 text-lg font-bold font-khumb-sans">
                <div className="flex flex-col items-center">
                    <FaHeart size={32} className={isLiked ? 'fill-red-500' : ''} onClick={handleLikeClick} />
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

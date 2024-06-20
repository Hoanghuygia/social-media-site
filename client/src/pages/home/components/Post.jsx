import { Flex, Text, Image } from "@chakra-ui/react";
import PostHead from "./PostHead";
import PostInfor from "./PostInfor";
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlinePaperAirplane,
    HiHeart,
} from "react-icons/hi2";
import { useState } from "react";
import Video from "../../explore/Video";
import Cookies from "js-cookie";
import { apiRequestPost } from "../../../utils/helper";
import { useSelector } from "react-redux";

function Post({ post }) {
    const currentUserID = Cookies.get("userId");
    const accessToken = Cookies.get("token");
    const firstName = Cookies.get("firstName");
    const lastName = Cookies.get("lastName");

    const [likesCount, setLikesCount] = useState(post.post.like);
    const [isLiked, setIsLiked] = useState(false);

    const socket = useSelector((state) => state.window.socket);

    if (!post) {
        return null;
    }

    const {
        comment = 0,
        share = 0,
        userId,
        post: postDetails,
    } = post;

    const handleLikeClick = async () => {
        setIsLiked(!isLiked);
        
        if (currentUserID !== userId) {
            const likePackage = {
                Object_id: userId,
                post_id: post.post.post_id,
            };

            try {
                await apiRequestPost("https://sugar-cube.onrender.com/post/like", accessToken, likePackage);
                setLikesCount((prev) => prev + (isLiked ? -1 : 1));
            } catch (error) {
                console.error("Error in save like");
                return;
            }

            const notification = {
                userID: userId,
                contentNotification: `${firstName} ${lastName} just thump your post`,
                senderID: currentUserID,
            };

            try {
                await apiRequestPost(
                    "https://sugar-cube.onrender.com/notification",
                    accessToken,
                    notification
                );
            } catch (error) {
                console.log("Error in create notification");
                return;
            }

            if (socket) {
                socket.emit("send-notification", notification);
            }
        }
    };

    const CustomIcon = isLiked ? HiHeart : HiOutlineHeart;

    const isVideo = (url) => {
        const videoExtensions = ["mp4", "webm", "ogg"];
        const imageExtensions = ["png", "jpg", "jpeg", "gif"];
        const decodedUrl = decodeURIComponent(url);
        const match = decodedUrl.match(/\.([^.?#/\\]+)(?:[?#]|$)/);
        if (!match) return false;
        const extension = match[1].toLowerCase();
        return videoExtensions.includes(extension);
    };

    if (!postDetails) {
        return null;
    }

    return (
        <div>
            <PostHead
                channel={userId}
                time={postDetails.timestamp}
                type={postDetails.privacyLevel}
            />
            <Text
                ml="30px"
                mt={"10px"}
                align={"left"}
                className="font-inter font-normal"
            >
                {postDetails.content}
            </Text>
            <div className="rounded-xl py-2 flex justify-center">
                {postDetails.mediaURL &&
                    (isVideo(postDetails.mediaURL) ? (
                        <Video url={postDetails.mediaURL} />
                    ) : (
                        <Image
                            mx="28px"
                            py="3"
                            src={postDetails.mediaURL}
                            className="rounded-xl"
                            style={{
                                width: "100%",
                                maxWidth: "600px",
                                maxHeight: "400px",
                            }}
                        />
                    ))}
            </div>
            <Flex
                justifyContent={"space-between"}
                gap={"10px"}
                px={"10px"}
                py={"18px"}
            >
                <PostInfor
                    infor={likesCount.toLocaleString()}
                    icon={CustomIcon}
                    onClick={handleLikeClick}
                />
                <PostInfor
                    infor={comment.toLocaleString()}
                    icon={HiOutlineChatBubbleOvalLeftEllipsis}
                />
                <PostInfor
                    infor={share.toLocaleString()}
                    icon={HiOutlinePaperAirplane}
                />
            </Flex>
        </div>
    );
}

export default Post;

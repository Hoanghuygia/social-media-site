import { Flex, Text, Image } from "@chakra-ui/react";
import PostHead from './PostHead';
import PostInfor from './PostInfor';
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlinePaperAirplane,
    HiHeart
} from "react-icons/hi2";
import { useState } from 'react';
import Video from '../../explore/Video'

function Post({ post }) { // Receive necessary props
  if (!post) {
    return null; // or handle loading state if necessary
  }

  const { like = 0, comment = 0, share = 0, userId, post: postDetails } = post;

  const [isLiked, setIsLiked] = useState(false);

  const likeClick = () => {
      setIsLiked(!isLiked);
      console.log("change");
  }
  const CustomIcon = isLiked ? HiHeart : HiOutlineHeart;

  const isVideo = (url) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  
    const decodedUrl = decodeURIComponent(url);
  
    const match = decodedUrl.match(/\.([^.?#/\\]+)(?:[?#]|$)/);
  
    if (!match) return false; // No file extension found
  
    const extension = match[1].toLowerCase();
      if (videoExtensions.includes(extension)) {
      return true;
    }
  
    if (imageExtensions.includes(extension)) {
      return false; // Skip images
    }
      return false;
  };
  

  if (!postDetails) {
    return null; // Handle case where postDetails is not available
  }
  console.log(`URL: ${postDetails.mediaURL} - Is video: ${isVideo(postDetails.mediaURL)}`);

  console.log("this is CONTENT", postDetails.content); // Ensure "content" is accessible on "postDetails"
  
  return (
    <div>
      <PostHead 
        channel={userId} // Access "userId" from "post" prop
        time={postDetails.timestamp}
        type={postDetails.privacyLevel}
      />
      <Text ml="30px" mt={"10px"} align={"left"} className="font-inter font-normal">
        {postDetails.content}
      </Text>
      <div className="rounded-xl py-2 flex justify-center">
        { postDetails.mediaURL && (
          isVideo(postDetails.mediaURL) ? (
            <Video 
            url={postDetails.mediaURL} 
            />
          ) : (
            <Image 
              mx="28px"
              py="3"
              src={postDetails.mediaURL}
              className="rounded-xl"
              style={{ width: "100%", maxWidth: "600px", maxHeight: "400px" }}
            />
          )
        )}
      </div>
      <Flex
        justifyContent={"space-between"}
        gap={"10px"}
        px={"10px"}
        py={"18px"}
      >
        <PostInfor
          infor={like.toLocaleString()}
          icon={CustomIcon}
          onClick={likeClick}
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

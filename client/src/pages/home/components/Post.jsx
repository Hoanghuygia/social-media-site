import { Flex, Text, Image, Box } from "@chakra-ui/react";
import PostHead from "./PostHead";
import PostInfor from "./PostInfor";
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlinePaperAirplane,
    HiHeart
} from "react-icons/hi2";
import {useState } from 'react';


function Post({ data }) {
    const { channel, time, type, content, like, comment, share } = data;
    const [isLiked, setIsLiked] = useState(false);

    const likeClick = () => {
        setIsLiked(!isLiked);
        console.log("change");
    }
    const CustomIcon = (isLiked) ? HiHeart : HiOutlineHeart;

    return (
        <Box borderRadius="2xl" bg={"white"} mt={"12px"}>
            <Flex flexDir={"column"} py={"20px"} >
                <PostHead channel={channel} time={time} type={type} />
                <Text ml="18px" mt={"10px"} align={"left"}>
                    {content.text}
                </Text>
                <Image mx={"28px"} src={content.image} />
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
            </Flex>
        </Box>
    );
}

export default Post;

import { Flex, Text, Image } from "@chakra-ui/react";
import PostHead from "./PostHead";
import PostInfor from "./PostInfor";
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlinePaperAirplane,
} from "react-icons/hi2";

function Post({ data }) {
    const { channel, time, type, content, like, comment, share } = data;

    return (
        <Flex flexDir={"column"} py={"20px"} borderBottom={"1px solid RGBA(0, 0, 0, 0.16)"}>
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
                    icon={HiOutlineHeart}
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
    );
}

export default Post;

import {
    Flex,
    Text,
    Image,
} from "@chakra-ui/react";
import PostHead from "./PostHead";
import PostInfor from "./PostInfor";
import { HiOutlineHeart, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlinePaperAirplane } from "react-icons/hi2";

function Post() {
    return (
        <Flex flexDir={"column"}>
            <PostHead />
            <Text ml="18px" mt={"10px"} align={"left"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                id dictum neque, id dignissim tellus. In fermentum sagittis
                lorem vehicula blandit
            </Text>
            <Image mx={"28px"} src="/img/image_1.png" />
            <Flex justifyContent={"space-between" } gap={"10px"} px={"10px"} py={"18px"}>
                <PostInfor infor="100k" icon={HiOutlineHeart}/>
                <PostInfor infor="100" icon={HiOutlineChatBubbleOvalLeftEllipsis }/>
                <PostInfor infor="10" icon={HiOutlinePaperAirplane }/> 
            </Flex>
        </Flex>
    );
}

export default Post;

import { Avatar, Box, Flex, Heading, Text, Icon, Spacer } from "@chakra-ui/react";
import { HiOutlineGlobeAlt, HiOutlineEllipsisHorizontal, HiOutlineUsers, HiOutlineUser} from "react-icons/hi2";

function PostHead({channel, time, type}) {
    const getIconByType = (type) =>{
        switch (type){
            case "public":
                return HiOutlineGlobeAlt;
            case "friend":
                return HiOutlineUsers;
            case "private":
                return HiOutlineUser;
            default:
                console.error(`Unknown type: ${type}`);
                throw error;
        }
    }

    const icon = getIconByType(type);
    return (
        <Flex flexDir={"row"} gap={3} marginLeft={"30px"} mt={"10px"}>
            <Avatar src={"/img/avatar.png"}></Avatar>
            <Box align="left">
                <Heading as={"h3"} fontSize={"lg"}>
                    {channel}
                </Heading>
                <Text fontSize={"md"}>
                    {time}
                    <Icon as={icon} ml={"10px"} />
                </Text>
            </Box>
            <Spacer/>
            <Icon boxSize={7} as={HiOutlineEllipsisHorizontal} mr={"10px"}/>
        </Flex>
    );
}

export default PostHead;

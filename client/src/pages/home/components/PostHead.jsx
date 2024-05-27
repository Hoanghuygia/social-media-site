import { Avatar, Box, Flex, Heading, Text, Icon, Spacer } from "@chakra-ui/react";
import { HiOutlineGlobeAlt, HiOutlineEllipsisHorizontal } from "react-icons/hi2";

function PostHead() {
    return (
        <Flex flexDir={"row"} gap={3} marginLeft={"30px"} mt={"10px"}>
            <Avatar src={"/img/avatar.png"}></Avatar>
            <Box align="left">
                <Heading as={"h3"} fontSize={"lg"}>
                    Swirl Lolipop
                </Heading>
                <Text fontSize={"md"}>
                    One day ago
                    <Icon as={HiOutlineGlobeAlt} ml={"10px"} />
                </Text>
            </Box>
            <Spacer/>
            <Icon boxSize={7} as={HiOutlineEllipsisHorizontal} mr={"10px"}/>
        </Flex>
    );
}

export default PostHead;

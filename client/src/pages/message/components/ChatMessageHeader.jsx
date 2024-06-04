import {
    Flex,
    Box,
    Text,
    Heading,
    Avatar,
    AvatarBadge,
    Icon,
    Spacer,
} from "@chakra-ui/react";
import {
    HiOutlinePhone,
    HiOutlineVideoCamera,
    HiDotsHorizontal,
} from "react-icons/hi";

function ChatMessageHeader() {
    return (
        <Box
            minH="12%"
            bg="transparent"
            borderBottom="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
        >
            <Flex h="100%" alignItems={"center"}>
                <Avatar src={"/img/avatar.png"} ml="16px">
                    <AvatarBadge
                        boxSize=".75em"
                        bg="green.500"
                        borderWidth="2px"
                    />
                </Avatar>
                <Box mx="16px">
                    <Heading as="h2" fontSize="md">
                        Swirl Lolipop
                    </Heading>
                    <Text noOfLines={1}>20cm 20 tieng, su can bang hoan hao</Text>
                </Box>
                <Spacer />
                <Flex
                    fontSize={"2xl"}
                    display={"flex"}
                    flexDir={"row"}
                    gap={3}
                    mr={"15px"}
                >
                    <Icon as={HiOutlinePhone} />
                    <Icon as={HiOutlineVideoCamera} />
                    <Icon as={HiDotsHorizontal} />
                </Flex>
            </Flex>
        </Box>
    );
}

export default ChatMessageHeader;

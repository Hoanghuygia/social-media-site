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
import { useSelector } from "react-redux";
import { apiRequest } from "../../../utils/helper";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const accessToken = Cookies.get("token");
let recepientID;

const fetchUserFromId = async () => {
    if (recepientID) {
        const URL = `http://localhost:3000/user/${recepientID}`;
        return await apiRequest(URL, accessToken);
    }
};

function ChatMessageHeader() {
    const messageState = useSelector((state) => state.message);
    recepientID = messageState.recepientID;
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try {
            const userData = await fetchUserFromId();
            setUser(userData);
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [recepientID, accessToken]);

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
                        // bg="green.500"
                        bg={user && user.status === "Online" ? "green.500" : "red.300"}
                        borderWidth="2px"
                    />
                </Avatar>
                <Box mx="16px">
                    <Heading as="h2" fontSize="md">
                    {user && `${user.firstname} ${user.lastname}`}
                    </Heading>
                    <Text noOfLines={1}>
                        {user && `${user.thought}`}
                    </Text>
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

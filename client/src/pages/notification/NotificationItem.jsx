import { Flex, Box, Text, Heading, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { apiRequestPost } from "../../utils/helper";
import Cookies from "js-cookie";

function NotificationItem({ data }) {
    const currentUserID = Cookies.get("userId");
    const accessToken = Cookies.get("token");

    const { avatar, name, content, read: isRead, notificationID } = data;
    const [read, setRead] = useState(isRead);

    const handleClick = async () => {
        setRead(true);
        const packge = {
            user_id: currentUserID,
            notification_id: notificationID,
        };
        try {
            await apiRequestPost(
                "http://localhost:3000/notification/setRead",
                accessToken,
                packge
            );
        } catch (error) {
            console.log("Error in set read to true");
            return;
        }
    };
    return (
        <>
            <Box
                minH="70px"
                maxW="100%"
                overflow="hidden"
                pt="10px"
                _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
                borderRadius="xl"
                m="5px"
                position="relative"
                onClick={handleClick}
            >
                <Flex h="100%">
                    <Avatar
                        src={avatar}
                        ml="16px"
                        mb="20px"
                        display="inline-block"
                    />
                    <Box mx="16px">
                        <Heading as="h2" fontSize="lg">
                            {name}
                        </Heading>
                        <Text>{content}</Text>
                    </Box>
                </Flex>
                {!read && (
                    <Box
                        position="absolute"
                        top="35px"
                        right="16px"
                        w="12px"
                        h="12px"
                        bg="blue.500"
                        borderRadius="50%"
                    />
                )}
            </Box>
        </>
    );
}

export default NotificationItem;

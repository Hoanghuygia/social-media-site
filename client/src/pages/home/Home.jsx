import { Box, Flex } from "@chakra-ui/react";
import StoryFrame from "./components/StoryFrame";
import PostZone from "./components/PostZone";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { socket, connectSocket } from "../../socket";


function Home() {

    const currentUserID = Cookies.get("token");
    console.log(currentUserID);

    useEffect(() => {
        if (!socket) {
            connectSocket(currentUserID);
        }

        if (socket) {

            socket.on('total-connected', (data) => {
                console.log("Data socket: " + data);
            });

            return () => {
                if (socket) {
                    socket.off('total-connected');
                }
            };
        }
    }, []);

    return (
        <Flex bg="bg-color.100" h={"100%"} maxW={"100%"} flexDir={"column"}>
            <Box flex={1} maxW={"100%"} mt={"12px"}>
                <StoryFrame />
            </Box>
            <Box flex={7} align='center' mt={"20px"}>
                <PostZone />
            </Box>
        </Flex>
    );
}

export default Home;

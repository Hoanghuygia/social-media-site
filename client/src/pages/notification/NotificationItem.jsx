import { Flex, Box, Text, Heading, Avatar } from "@chakra-ui/react";
import { useState } from "react";

function NotificationItem({ data }) {
    const { ava, name, descri } = data;
    const [read, setRead] = useState(false);

    const handleClick = () => {
        setRead(true);
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
                        src={ava}
                        ml="16px"
                        mb="20px"
                        display="inline-block"
                    />
                    <Box mx="16px">
                        <Heading as="h2" fontSize="lg">
                            {name}
                        </Heading>
                        <Text>{descri}</Text>
                    </Box>
                </Flex>
                {!read && <Box
                    position="absolute"
                    top="35px" 
                    right="16px" 
                    w="12px"
                    h="12px"
                    bg="blue.500"
                    borderRadius="50%"
                />}
            </Box>
        </>
    );
}

export default NotificationItem;

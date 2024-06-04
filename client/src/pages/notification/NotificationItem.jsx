import {
    Flex,
    Box,
    Text,
    Heading,
    Avatar,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { useState, useEffect } from 'react';

function NotificationItem({ data }) {
    const { ava, name, descri } = data;
    const [bgcolor, setBgColor] = useState("transparent");
    const [textcolor, setTextColor] = useState("#000000");
    const click = () => {
        setBgColor("#eddae6");
        setTextColor("#8a8a8a");
    };
    return ( 
    <>
       <Box
            minH="70px"
            borderBottom="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
            maxH="70px"
            overflow="hidden"
            pt="10px"
            style={{backgroundColor: bgcolor}}
            onClick={click}
            className="hover:shadow-[inset_0px_0px_10px_2px_rgb(0,0,0,0.25)]"
        >
            <Flex h="100%" alignItems={"top"}>
                <Avatar src={ava} ml="16px" mb="20px" display="inline-block">
                </Avatar>
                <Box mx="16px" color={textcolor}>
                    <Heading as="h2" fontSize="md">
                        {name}
                    </Heading>
                    <Text>
                        {descri}
                    </Text>
                </Box>
            </Flex>
        </Box>
    </>
);
}

export default NotificationItem;
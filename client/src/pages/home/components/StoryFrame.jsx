import { Avatar, Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";

let data = [
    {
        channel: "_thepany_a",
        avatar: "/img/avatar.png",
    },
    {
        channel: "phunnneee",
        avatar: "/img/avatar.png",
    },
    {
        channel: "swirll ",
        avatar: "/img/avatar.png",
    },
    {
        channel: "_thepany_a",
        avatar: "/img/avatar.png",
    },
    {
        channel: "_thepany_a",
        avatar: "/img/avatar.png",
    },
    {
        channel: "_thepany_a",
        avatar: "/img/avatar.png",
    },
]


function StoryFrame() {
    const { mainWidth } = useSelector((state) => ({
        mainWidth: state.mainWidth,
    }));

    return (
        <Flex
            flexDir="row"
            h={"100%"}
            width={`${mainWidth}px`}
            overflowX="scroll"
            alignItems={"center"}
            gap={8}
            css={{
                "&::-webkit-scrollbar": {
                    height: "8px", 
                },
                "&::-webkit-scrollbar-track": {
                    background: "gray.100", 
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "gray.300", 
                    borderRadius: "4px", 
                },
            }}
        >
            
            <Flex flexDir={"column"} alignItems={"center"} ml={"50px"}>
                <Button bg="transparent"  _hover={{ bg: "transparent" }} ><Icon boxSize={12} as={HiOutlinePlusCircle}/></Button>
                <Text>HA</Text>
            </Flex>

            {data.map((item, index) => (
                <Flex flexDir={"column"} alignItems={"center"}>
                <Avatar
                    size="lg"
                    name="chat-bubble"
                    src={item.avatar}
                    borderColor="bg-color.300"
                    borderWidth="3px"
                ></Avatar>
                <Text>{item.channel}</Text>
            </Flex>
            ))}         
        </Flex>
    );
}

export default StoryFrame;

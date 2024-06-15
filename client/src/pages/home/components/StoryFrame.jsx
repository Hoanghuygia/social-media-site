import { Avatar, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { HiOutlinePlusCircle } from "react-icons/hi2";

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
    return (
        <Flex
            flexDir="row"
            h={"100%"}
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
            
            <Flex flexDir={"column"} alignItems={"center"} ml={"50px"} height={"100%"} paddingTop={"14px"}>
                <Button bg="transparent"  _hover={{ bg: "transparent" }} ><Icon boxSize={12} as={HiOutlinePlusCircle} className="hover:shadow-[0px_0px_12px_2px_rgb(158,0,141,0.5),inset_0px_0px_8px_1px_rgb(158,0,141,0.5)] rounded-[110px]" /></Button>
                <Text className="mt-[12%]">HA</Text>
            </Flex>

            {data.map((item, index) => (
            <Flex key={index} flexDir={"column"} alignItems={"center"}>
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

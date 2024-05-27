import { Avatar, Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function StoryFrame() {
    const { mainWidth } = useSelector((state) => ({
        mainWidth: state.mainWidth,
    }));

    console.log("Main width inside StoryFrame: " + mainWidth);

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
                    height: "8px", // Đặt chiều cao của thanh trượt
                },
                "&::-webkit-scrollbar-track": {
                    background: "gray.100", // Đặt màu nền của thanh trượt
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "gray.300", // Đặt màu của nút trượt
                    borderRadius: "4px", // Đặt bo góc của nút trượt
                },
            }}
        >
            <Avatar ml={"50px"} size="lg" borderColor="bg-color.300" borderWidth="3px"></Avatar>
            <Avatar size="lg" name="chat-bubble" src={"/img/avatar.png"} borderColor="bg-color.300" borderWidth="3px" ></Avatar>
            <Avatar size="lg" name="chat-bubble" src={"/img/avatar.png"} borderColor="bg-color.300" borderWidth="3px" ></Avatar>
            <Avatar size="lg" name="chat-bubble" src={"/img/avatar.png"} borderColor="bg-color.300" borderWidth="3px" ></Avatar>
            <Avatar size="lg" name="chat-bubble" src={"/img/avatar.png"} borderColor="bg-color.300" borderWidth="3px" ></Avatar>
            <Avatar size="lg" name="chat-bubble" src={"/img/avatar.png"} borderColor="bg-color.300" borderWidth="3px" ></Avatar>
            
        </Flex>
    );
}

export default StoryFrame;

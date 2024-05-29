import { Flex, Box, Icon, Input, Button } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import {
    HiOutlineCamera,
    HiOutlineMicrophone,
    HiOutlinePhotograph,
    HiOutlineEmojiHappy,
} from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function ChatMessageBar() {
    //USE STATE
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    //HANDLE
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleSendImage = () => {
        if (sendImage.current) {
            sendImage.current.click();
        }
    };

    const handleEmojiPickerClick = (event) => {
        event.stopPropagation();
    };

    const handleEmojiIconClick = (event) => {
        event.stopPropagation();
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            setOpen(false);
        }

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const sendImage = useRef();

    return (
        <Box>
            <input
                type="file"
                id="file"
                style={{ display: "none" }}
                ref={sendImage}
            />
            <Flex alignItems={"center"} gap={2} mb={"6px"} mx={"10px"}>
                <Flex fontSize={"2xl"} display={"flex"} flexDir={"row"} gap={3}>
                    <Icon
                        as={HiOutlinePhotograph}
                        onClick={handleSendImage}
                        cursor="pointer"
                    />
                    <Icon as={HiOutlineCamera} cursor="pointer" />
                    <Icon as={HiOutlineMicrophone} cursor="pointer" />
                </Flex>
                <Input
                    py="4px"
                    mt="5px"
                    pl="10px"
                    value={text}
                    variant="unstyled"
                    placeholder="Type a message"
                    borderRadius="xl"
                    bg="RGBA(0, 0, 0, 0.08)"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
                <Box position="relative">
                    <Icon
                        _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
                        fontSize="2xl"
                        as={HiOutlineEmojiHappy}
                        onClick={handleEmojiIconClick}
                        cursor="pointer"
                    />
                    {open && (
                        <Box
                            position="absolute"
                            bottom="50px"
                            right="0"
                            zIndex="10"
                            bg="white"
                            boxShadow="md"
                            borderRadius="md"
                            onClick={handleEmojiPickerClick}
                        >
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </Box>
                    )}
                </Box>

                <Button mr={"5px"}>Send</Button>
            </Flex>
        </Box>
    );
}

export default ChatMessageBar;

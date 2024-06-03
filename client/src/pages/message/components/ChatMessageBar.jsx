import {
    Flex,
    Box,
    Icon,
    Input,
    Button,
    Image,
    Spacer,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import {
    HiOutlineCamera,
    HiOutlineMicrophone,
    HiOutlinePhotograph,
    HiOutlineEmojiHappy,
} from "react-icons/hi";
import { HiOutlineFolderPlus, HiXCircle } from "react-icons/hi2";
import EmojiPicker from "emoji-picker-react";
// import ImageBar from "./ImageBar";
import IconTest from "./IconTest";
import { useDispatch } from 'react-redux';

function ChatMessageBar() {
    //USE STATE
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    // const [message, setMessage] = useState("");
    const ADD_MESSAGE = 'ADD_MESSAGE';

    const dispatch = useDispatch();
  
    const addMessage = (message) => ({
        type: ADD_MESSAGE,
        payload: message,
      });

    //HANDLER
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSendMessage = (e) => {
        if(text === "") return;
        
        dispatch(addMessage({
            content: text,
            user: true
        }));
        setText("");
    };

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
        // setText((prev) => prev + e.emoji)
    };

    const deleteImageFromBuffer = () => {
        setImage(null);
    }

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
        <Box mb={"2px"}>
            <input
                type="file"
                id="file"
                style={{ display: "none" }}
                ref={sendImage}
                onChange={handleImageChange}
            />
            <Flex
                alignItems={image ? "flex-end" : "center"}
                gap={2}
                mb={"6px"}
                mx={"10px"}
            >
                <Flex fontSize={"2xl"} display={"flex"} flexDir={"row"} gap={3}>
                    <Icon
                        as={HiOutlinePhotograph}
                        onClick={handleSendImage}
                        cursor="pointer"
                    />
                    <Icon as={HiOutlineCamera} cursor="pointer" />
                    <Icon as={HiOutlineMicrophone} cursor="pointer" />
                </Flex>
                <Box
                    display="flex"
                    alignItems="flex-end"
                    h={image ? "80px" : "auto"}
                    bg="RGBA(0, 0, 0, 0.08)"
                    borderRadius="xl"
                    px="10px"
                    flex="1"
                    flexDir={"column"}
                >
                    {image && (
                        <Flex w={"100%"} mt={"10px"}>
                            <Box
                                boxSize={"35px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <Icon as={HiOutlineFolderPlus} />
                            </Box>
                            <Box position="relative">
                                <Image
                                    objectFit="cover"
                                    boxSize="35px"
                                    src={URL.createObjectURL(image)}
                                />
                                <Icon
                                    position="absolute"
                                    top="0"
                                    right="0"
                                    transform="translate(25%, -25%)"
                                    as={HiXCircle}
                                    boxSize="6"
                                    color="RGBA(0, 0, 0, 0.6)"
                                    _hover={{
                                        color:"RGBA(0, 0, 0, 0.4)"
                                    }}
                                    onClick={deleteImageFromBuffer}
                                />
                                {/* <IconTest handleTest={deleteImageFromBuffer}/> */}
                            </Box>
                        </Flex>
                    )}
                    <Input
                        value={text}
                        variant="unstyled"
                        placeholder="Type a message"
                        py="4px"
                        mt="5px"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        onKeyPress={handleKeyPress}
                    />
                </Box>
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

                <Button mr={"5px"} onClick={handleSendMessage}>Send</Button>
            </Flex>
        </Box>
    );
}

export default ChatMessageBar;

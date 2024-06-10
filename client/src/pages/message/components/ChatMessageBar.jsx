import {Flex, Box, Icon, Button,} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import { HiOutlineCamera, HiOutlineMicrophone, HiOutlinePhotograph, } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from "../../../utils/uploadImage";
import { apiRequestPost } from "../../../utils/helper";
import EmojiPickerComponent from "./EmojiPickerComponent";
import InputMessage from "./InputMessage";

function ChatMessageBar() {
    const recepientID = useSelector((state) => state.recepientID);
    const currentUsername = 'ghuy1234';
    const currentUserId = '666377f35676ff7fa0451749';
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjBiOGJjOWM2NDIwNjdmYTIzNTgyYiIsImlhdCI6MTcxNzg3OTA4MSwiZXhwIjoxNzQ5NDM2NjgxfQ.sEU-SFK6Brb8_FsRvQPqJ0AFD7D_tPaNrosx6scQW7g"
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState({
        file: null,
        url: "",
    });
    const ADD_MESSAGE = 'ADD_MESSAGE';

    const dispatch = useDispatch();

    const addMessage = (message) => ({
        type: ADD_MESSAGE,
        payload: message,
    });

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (text === "" && !image.file) return;

        let imgURL = null;

        if (image.file) {
            try {
                imgURL = await uploadImage(image.file);
            } catch (error) {
                console.error("Image upload failed: ", error);
                return;
            }
        }

        const message = {
            "userId1": currentUserId,
            "userId2": recepientID,
            "username": currentUsername,
            "content": text,
            "imageURL": imgURL
        }
        apiRequestPost("http://localhost:3000/message", accessToken, message)

        dispatch(addMessage({
            content: text,
            imageURL: imgURL,
            username: currentUsername,
        }));

        setText("");
        setImage({
            file: null,
            url: "",
        });
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

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImage({
                file: event.target.files[0],
                url: URL.createObjectURL(event.target.files[0])
            });
            event.target.value = null;
        }
    };

    const deleteImageFromBuffer = () => {
        setImage({
            file: null,
            url: "",
        });
    };

    useEffect(() => {
        function handleClickOutside() {
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
                alignItems={image.file ? "flex-end" : "center"}
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
                <InputMessage image={image} deleteImageFromBuffer={deleteImageFromBuffer} setText={setText} text={text} handleKeyPress={handleKeyPress}/>
                <EmojiPickerComponent
                    onEmojiClick={handleEmoji}
                    open={open}
                    setOpen={setOpen}
                />

                <Button mr={"5px"} onClick={handleSendMessage}>Send</Button>
            </Flex>
        </Box>
    );
}

export default ChatMessageBar;

import { Flex, Box, Icon, Button } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import {
    HiOutlineCamera,
    HiOutlineMicrophone,
    HiOutlinePhotograph,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../../../utils/uploadImage";
import { apiRequestPost } from "../../../utils/helper";
import Cookies from "js-cookie";
import EmojiPickerComponent from "./EmojiPickerComponent";
import InputMessage from "./InputMessage";
import { addMessage, changeLastMessage } from "../../../stores/messageSlice";

const currentUserId = Cookies.get("userId");
const accessToken = Cookies.get("token");
const currentUsername = Cookies.get("username");

function ChatMessageBar() {
    const { recepientID } = useSelector((state) => state.message);
    const socket = useSelector((state) => state.window.socket);

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState({
        file: null,
        url: "",
    });

    const dispatch = useDispatch();

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
            userId1: currentUserId,
            userId2: recepientID,
            username: currentUsername,
            content: text,
            imageURL: imgURL,
        };
        apiRequestPost("http://localhost:3000/message", accessToken, message);

        dispatch(
            changeLastMessage({
                content: text,
                recepientID: recepientID,
            })
        );
        dispatch(
            addMessage({
                content: text,
                imageURL: imgURL,
                username: currentUsername,
            })
        );

        if (socket) {
            socket.emit("send-message", message);
        }

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
                url: URL.createObjectURL(event.target.files[0]),
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
    }, [accessToken]);

    useEffect(() => {
        if (socket) {
            socket.on("new-message", (data) => {
                if (data) {
                    dispatch(
                        changeLastMessage({
                            content: data.content,
                            recepientID: data.recepientID,
                        })
                    );
                    dispatch(
                        addMessage({
                            content: data.content,
                            imageURL: data.imageURL,
                            username: data.username,
                        })
                    );
                } else {
                    console.warn("Received empty message data.");
                }
            });

            socket.on("verify-sent", (message) => {
                // console.log("Sent message verification: ", message);
                //I active music later
            });

            return () => {
                socket.off("new-message");
                socket.off("verify-sent");
            };
        }
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
                <InputMessage
                    image={image}
                    deleteImageFromBuffer={deleteImageFromBuffer}
                    setText={setText}
                    text={text}
                    handleKeyPress={handleKeyPress}
                />
                <EmojiPickerComponent
                    onEmojiClick={handleEmoji}
                    open={open}
                    setOpen={setOpen}
                />

                <Button mr={"5px"} onClick={handleSendMessage}>
                    Send
                </Button>
            </Flex>
        </Box>
    );
}

export default ChatMessageBar;

import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerComponent = ({ onEmojiClick, open, setOpen }) => {
    const handleEmojiPickerClick = (event) => {
        event.stopPropagation();
    };

    const handleEmojiIconClick = (event) => {
        event.stopPropagation();
        setOpen((prev) => !prev);
    };

    return (
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
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </Box>
            )}
        </Box>
    );
};

export default EmojiPickerComponent;

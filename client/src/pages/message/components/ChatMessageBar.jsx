import {
    Flex,
    Box,
    Icon,
    Input,
    Button,

} from "@chakra-ui/react";
import {
    HiOutlineCamera,
    HiOutlineMicrophone,
    HiOutlinePhotograph,
    HiOutlineEmojiHappy,
} from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function ChatMessageBar() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    return (
        <Box>
                <Flex alignItems={"center"} gap={2} mb={"6px"}>
                    <Flex
                        fontSize={"2xl"}
                        display={"flex"}
                        flexDir={"row"}
                        gap={3}
                    >
                        <Icon as={HiOutlinePhotograph} />
                        <Icon as={HiOutlineCamera} />
                        <Icon as={HiOutlineMicrophone} />
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
                    {/* <div className="emoji">
                        <Icon
                            _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
                            fontSize={"2xl"}
                            as={HiOutlineEmojiHappy}
                            onClick={() => {
                                setOpen((prev) => !prev);
                            }}
                        />

                        <div className="picker">
                            <EmojiPicker
                                open={open}
                                onEmojiClick={handleEmoji}
                            />
                        </div>
                    </div> */}
                    <Box position="relative">
                        <Icon
                            _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
                            fontSize="2xl"
                            as={HiOutlineEmojiHappy}
                            onClick={() => setOpen((prev) => !prev)}
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
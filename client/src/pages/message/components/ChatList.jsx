import {Box, Flex} from "@chakra-ui/react";
import SearchBar from "../../../components/SearchBar";
import ChatListItem from "./ChatListItem";

function ChatList() {
    return (
        <Flex
            flexDir="column"
            h="100%"
            overflowY="auto"
            w={"100%"}
            sx={{
                "&::-webkit-scrollbar": {
                    width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "gray.300",
                    borderRadius: "4px",
                },
            }}
        >
            <Box
                minH="12%"
                bg="transparent"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <SearchBar className="w-9/12" />
            </Box>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            {/* <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/> */}
            
        </Flex>
    );
}

export default ChatList;

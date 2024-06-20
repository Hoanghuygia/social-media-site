import { Box,} from "@chakra-ui/react";

function ButtonNot({contentText, onClick, isUnread}) {
    let backgroundColor;
    if(isUnread && contentText === 'Unread'){
        backgroundColor = "RGBA(0, 0, 0, 0.16)"
    }

    return (
        <Box
            mx={"3px"}
            p={"7px"}
            borderRadius="3xl"
            _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
            bg={backgroundColor}
            onClick={onClick}
        >{contentText}</Box>
    );
}

export default ButtonNot;

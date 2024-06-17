import { Box,} from "@chakra-ui/react";

function ButtonNot({contentText, onClick}) {
    return (
        <Box
            mx={"3px"}
            p={"7px"}
            borderRadius="3xl"
            _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
            onClick={onClick}
        >{contentText}</Box>
    );
}

export default ButtonNot;

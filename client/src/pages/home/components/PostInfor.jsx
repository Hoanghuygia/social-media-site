import { Box, Icon, Button } from "@chakra-ui/react";

function PostInfor({infor, icon}) {
    return (
        <Button
            py="4px"
            mt="5px"
            px="10px"
            borderRadius="xl"
            bg="bg-color.300"
            align='center'
            flex="1"
        >
            <Icon boxSize={6} as={icon}/> {infor} 
        </Button>
    );
}

export default PostInfor;

import {
    Flex,
    Box,
    Text,
    Heading,
    Avatar,
    AvatarBadge
} from "@chakra-ui/react";

function NotificationItem() {
    const bgColor = {
        backgroundColor: "#f7e9f1"
    }
    return ( 
    <>
       <Box
            minH="11%"
            bg="transparent"
            borderBottom="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
            maxH="11%"
            overflow="hidden"
            mt="10px"
        >
            <Flex h="100%" alignItems={"center"}>
                <Avatar src={"/img/avatar.png"} ml="16px" mb="20px" display="inline-block">
                </Avatar>
                <Box mx="16px">
                    <Heading as="h2" fontSize="md">
                        Swirl Lolipop
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis at nulla nobis delectus? Ea, ab sequi dolor unde molestias nisi in aut eum quis enim, dignissimos impedit quos totam!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt animi reiciendis magni, vero neque repellat sed? Eligendi, odio. Quasi saepe dolore, placeat aliquam amet optio quia id perferendis itaque cum!
                    </Text>
                </Box>
            </Flex>
        </Box>
    </>
);
}

export default NotificationItem;
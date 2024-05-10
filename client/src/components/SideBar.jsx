import { Avatar, Center, VStack, Heading, Text, Flex, Box, Spacer, Icon } from "@chakra-ui/react";
import { BsBoxArrowInRight } from "react-icons/bs";
import SideBarNav from './SideBarNav';

function SideBar() {
    return (
        <Flex flexDir='column' h='100%' boxShadow='4px 0px 28px rgba(239, 202, 204, 1)' gap={4}>
            <Flex flexDir='column' mt='24px' textAlign="center" gap={3}>
                <Center><Avatar size='xl' name='profile' src={'/img/avatar.png'} /></Center>
                <Heading as="h2" fontSize='2xl' >Swilrl Lollipop</Heading>
                <Text>Lorem ipsum dolor sit</Text>
            </Flex>

            <Flex pt='24px' justifyContent='space-around' gap='24px'>
                <Box>
                    <Heading fontSize='xl'>60</Heading>
                    <Text fontSize='xs' color='RGBA(0, 0, 0, 0.48)' >Posts</Text>
                </Box>
                <Box>
                    <Heading fontSize='xl'>1,870</Heading>
                    <Text fontSize='xs' color='RGBA(0, 0, 0, 0.48)' >Followers</Text>
                </Box>
                <Box>
                    <Heading fontSize='xl'>633</Heading>
                    <Text fontSize='xs' color='RGBA(0, 0, 0, 0.48)'>Following</Text>
                </Box>
            </Flex>

            <SideBarNav/>

            <Spacer/>

            <Box display="flex" alignItems="center" gap='2' mb='10px'>
                <Icon as={BsBoxArrowInRight} />
                <Text>Log out</Text>
            </Box>
        </Flex>
        );
}

export default SideBar;
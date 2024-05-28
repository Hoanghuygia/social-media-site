import {
    Avatar,
    Center,
    Heading,
    Text,
    Flex,
    Box,
    Spacer,
    Icon,
} from "@chakra-ui/react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SideBarNav from "./SideBarNav";

function SideBar() {
    return (
        <Flex
            pr={"20px"}
            flexDir="column"
            h="100%"
            boxShadow="4px 0px 16px rgba(239, 202, 204, 1)"
            // boxShadow="0px -10px 28px rgba(239, 202, 204, 1), 0px 10px 28px rgba(239, 202, 204, 1)"
            gap={4}
        >
            <Flex flexDir="column" mt="24px" textAlign="center" gap={3}>
                <Center>
                    <Avatar size="xl" name="profile" src={"/img/avatar.png"} />
                </Center>
                <Heading as="h2" fontSize="2xl">
                    Swilrl Lollipop
                </Heading>
                <Text>Lorem ipsum dolor sit</Text>
            </Flex>

            <Flex pt="24px" justifyContent="space-around" gap="24px">
                <Box>
                    <Heading fontSize="xl">60</Heading>
                    <Text fontSize="xs" color="RGBA(0, 0, 0, 0.48)">
                        Posts
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize="xl">1,870</Heading>
                    <Text fontSize="xs" color="RGBA(0, 0, 0, 0.48)">
                        Followers
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize="xl">633</Heading>
                    <Text fontSize="xs" color="RGBA(0, 0, 0, 0.48)">
                        Following
                    </Text>
                </Box>
            </Flex>

            <SideBarNav />

            <Spacer />

            <Box display="flex" alignItems="center" gap="2" mb="10px" pl='25px'>
                <Icon as={BsBoxArrowInRight} />
                <StyledNavLink to="/login">Log out</StyledNavLink>
            </Box>
        </Flex>
    );
}

const StyledNavLink = styled(NavLink)`
    text-emphasis: none;
    text-decoration: none;
    color: black;
    display: flex; /* Sử dụng flexbox */
    align-items: center;
    &:hover {
        text-emphasis: none;
        text-decoration: none;
        color: black;
    }
`;

export default SideBar;

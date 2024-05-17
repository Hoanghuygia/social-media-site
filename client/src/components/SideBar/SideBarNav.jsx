import { Flex, Icon, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import styled from "styled-components";

function SideBarNav() {
    return (
        <Flex flexDir="column" gap={3} mt="10px">
            <Flex>
                <Box h="36px" bg="bg-color.100" w="30%"></Box>
                <Box
                    w="70%"
                    h="36px"
                    sx={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginY: "auto",
                    }}
                    _hover={{
                        borderTopLeftRadius: "2xl",
                        borderBottomLeftRadius: "2xl",
                        borderTopWidth: "3px",
                        borderColor: "#efcbce",
                        background:
                            "linear-gradient(to right, #fce2e3, #ebe1ed)",
                    }}
                    transition="background-color 0.3s"
                >
                    <StyledNavLink to="/">
                        <Icon as={SlHome} mx="5px" /> Home
                    </StyledNavLink>
                </Box>
            </Flex>

            <Flex>
                <Box h="36px" bg="bg-color.100" w="30%"></Box>
                <Box
                    w="70%"
                    h="36px"
                    sx={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginY: "auto",
                    }}
                    _hover={{
                        borderTopLeftRadius: "2xl",
                        borderBottomLeftRadius: "2xl",
                        borderTopWidth: "3px",
                        borderColor: "#efcbce",
                        background:
                            "linear-gradient(to right, #fce2e3, #ebe1ed)",
                    }}
                    transition="background-color 0.3s"
                >
                    <StyledNavLink to="/message">
                        <Icon as={SlHome} mx="5px" /> Message
                    </StyledNavLink>
                </Box>
            </Flex>

            <Flex>
                <Box h="36px" bg="bg-color.100" w="30%"></Box>
                <Box
                    w="70%"
                    h="36px"
                    sx={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginY: "auto",
                    }}
                    _hover={{
                        borderTopLeftRadius: "2xl",
                        borderBottomLeftRadius: "2xl",
                        borderTopWidth: "3px",
                        borderColor: "#efcbce",
                        background:
                            "linear-gradient(to right, #fce2e3, #ebe1ed)",
                    }}
                    transition="background-color 0.3s"
                >
                    <StyledNavLink to="/explore">
                        <Icon as={SlHome} mx="5px" /> Explore
                    </StyledNavLink>
                </Box>
            </Flex>

            <Flex>
                <Box h="36px" bg="bg-color.100" w="30%"></Box>
                <Box
                    w="70%"
                    h="36px"
                    sx={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginY: "auto",
                    }}
                    _hover={{
                        borderTopLeftRadius: "2xl",
                        borderBottomLeftRadius: "2xl",
                        borderTopWidth: "3px",
                        borderColor: "#efcbce",
                        background:
                            "linear-gradient(to right, #fce2e3, #ebe1ed)",
                    }}
                    transition="background-color 0.3s"
                >
                    <StyledNavLink to="/notification">
                        <Icon as={SlHome} mx="5px" /> Notification
                    </StyledNavLink>
                </Box>
            </Flex>

            <Flex>
                <Box h="36px" bg="bg-color.100" w="30%"></Box>
                <Box
                    w="70%"
                    h="36px"
                    sx={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginY: "auto",
                    }}
                    _hover={{
                        borderTopLeftRadius: "2xl",
                        borderBottomLeftRadius: "2xl",
                        borderTopWidth: "3px",
                        borderColor: "#efcbce",
                        background:
                            "linear-gradient(to right, #fce2e3, #ebe1ed)",
                    }}
                    transition="background-color 0.3s"
                >
                    <StyledNavLink to="/profile">
                        <Icon as={SlHome} mx="5px" /> Profile
                    </StyledNavLink>
                </Box>
            </Flex>
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

export default SideBarNav;

import { Flex, Icon, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

function Bar({ icon, barName, route }) {
    const location = useLocation();
    const isActive = location.pathname === route;

    return (
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
                borderTopLeftRadius={isActive ? "2xl" : "none"}
                borderBottomLeftRadius={isActive ? "2xl" : "none"}
                borderTopWidth={isActive ? "3px" : "none"}
                background={isActive ? "bg-color.300" : "none"}
                _hover={{
                    borderTopLeftRadius: "2xl",
                    borderBottomLeftRadius: "2xl",
                    borderTopWidth: "3px",
                    borderColor: "#efcbce",
                    background: "linear-gradient(to right, #fce2e3, #ebe1ed)",
                }}
                transition="background-color 0.3s"
            >
                <StyledNavLink to={route}>
                    <Icon boxSize={5} as={icon} mx="5px" /> {barName}
                </StyledNavLink>
            </Box>
        </Flex>
    );
}

const StyledNavLink = styled(NavLink)`
    text-emphasis: none;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    &:hover {
        text-emphasis: none;
        text-decoration: none;
        color: black;
    }
    height: 100%
`;

export default Bar;

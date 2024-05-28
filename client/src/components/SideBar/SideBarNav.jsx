import { Flex, Icon, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HiOutlineBellAlert, HiOutlineHome, HiOutlineChatBubbleOvalLeftEllipsis , HiOutlineGlobeAlt, HiOutlineUser} from "react-icons/hi2";
import Bar from "./Bar";
import styled from "styled-components";

function SideBarNav() {
    return (
        <Flex flexDir="column" gap={3} mt="10px">
            <Bar icon={HiOutlineHome} barName={"Home"} route={"/"}/>
            <Bar icon={HiOutlineChatBubbleOvalLeftEllipsis } barName={"Message"} route={"/message"}/>
            <Bar icon={HiOutlineGlobeAlt} barName={"Explore"} route={"/explore"}/>
            <Bar icon={HiOutlineBellAlert} barName={"Notification"} route={"/notification"}/>
            <Bar icon={HiOutlineUser} barName={"Profile"} route={"/profile"}/>
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
`;

export default SideBarNav;

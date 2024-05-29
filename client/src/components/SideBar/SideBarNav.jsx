import { Flex } from "@chakra-ui/react";
import { HiOutlineBellAlert, HiOutlineHome, HiOutlineChatBubbleOvalLeftEllipsis , HiOutlineGlobeAlt, HiOutlineUser} from "react-icons/hi2";
import Bar from "./Bar";

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

export default SideBarNav;

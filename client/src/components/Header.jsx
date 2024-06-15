import {
    Avatar,
    Flex,
    Heading,
    Image,
    Spacer,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";

function Header() {
    return (
        <Flex as="nav" p="7px" alignItems="center" h={"100%"}>
            <Image
                src="/img/sprite.png"
                alt="sprite icon"
                objectFit="cover"
                boxSize="55px"
                pt="10px"
            ></Image>
            <Heading as="h1" color="text-color.200">
                sugarCube
            </Heading>
            <Spacer />

            <SearchBar className="w-3/12 mr-20" />

            <Avatar src="/img/avatar.png" alt="avatar" mr="30px"></Avatar>
        </Flex>
    );
}

export default Header;

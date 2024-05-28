import {
    Avatar,
    Flex,
    Heading,
    Image,
    Spacer,
} from "@chakra-ui/react";
import React, { useRef } from 'react';
import { SearchIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";

function Header() {
    // const inputRef = useRef(null);

    // const focusInput = () => {
    //     inputRef.current.focus();
    // };

    return (
        <Flex className=" flex" as="nav" p="7px" alignItems="center">
            <Image
                src="/img/sprite.png"
                alt="sprite icon"
                objectFit="cover"
                boxSize="55px"
                pt="10px"
            ></Image>
            <Heading as="h1" color="text-color.200">
                sugarcube
            </Heading>
            <Spacer />

            <SearchBar className="w-3/12 mr-20" />

            <Avatar src="/img/avatar.png" alt="avatar" mr="30px"></Avatar>
        </Flex>
    );
}

export default Header;

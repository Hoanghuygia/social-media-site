import {
    Avatar,
    Flex,
    Heading,
    Image,
    Spacer,
} from "@chakra-ui/react";
import React, { useRef } from 'react';
import { SearchIcon } from "@chakra-ui/icons";

function Header() {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

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

            <div className="mr-20 bg-pink-100 rounded-2xl w-3/12">
                <SearchIcon onClick={focusInput} ml="10px" />
                <input
                    ref={inputRef}
                    type="text"
                    name="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="px-3 py-2 font-semibold placeholder-gray-500 text-black border-none bg-pink-100 rounded-2xl focus:border-transparent focus:outline-none"
                />
            </div>

            <Avatar src="/img/avatar.png" alt="avatar" mr="30px"></Avatar>
        </Flex>
    );
}

export default Header;

import React, { useState, useEffect } from 'react';
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
import Cookies from 'js-cookie';
import { apiRequestPost } from '../../utils/helper';
import { useSelector } from 'react-redux';

function SideBar() {
    const [userData, setUserData] = useState(null);
    const currentUserID = Cookies.get("userId");

    const socket = useSelector((state) => state.window.socket);

    const logout = async() => {
        // try {
        //     await apiRequestPost('', accessToken, currentUserID);
        // } catch (error) {
        //     console.log("There error in change status: ", error);
        //     return;
        // }
        if(socket){
            console.log("huy dep trai logout");
            socket.emit("disconnect", (currentUserID));
        }

        Object.keys(Cookies.get()).forEach(function (cookieName) {
            Cookies.remove(cookieName);
        });
        localStorage.clear();
    };

    const fetchUserData = async () => {
        const username = localStorage.username
        console.log(username)
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://sugar-cube.onrender.com/user/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('username');
            if (username) {
                const data = await fetchUserData(username);
                setUserData(data);
                localStorage.setItem('name', `${data.firstName} ${data.lastName}`);
            }
        };
        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Flex
            flexDir="column"
            h="100%"
            border="1px solid RGBA(0, 0, 0, 0.16)"
            gap={5}
        >
            <Flex flexDir="column" mt="70px" textAlign="center" gap={3}>
                <Center>
                    <Avatar size="2xl" name="profile" src={userData.profilePicture || "/img/avatar.png"} />
                </Center>
                <p className="h3 font-khumb-sans tracking-wider pt-3 font-bold text-3xl">
                    {userData.firstName} {userData.lastName}
                </p>
                <Text className='flex justify-between px-6'>{userData.desc}</Text>
            </Flex>

            <Flex pt="24px" justifyContent="space-around" gap="20px">
                <Box className='flex flex-col items-center justify-center font-inter'>
                    <Heading fontSize="xl">60</Heading>
                    <Text fontSize="xs" color="RGBA(0, 0, 0, 0.48)">
                        Posts
                    </Text>
                </Box>
                <Box className='flex flex-col items-center justify-center font-inter'>
                    <Heading fontSize="xl">{userData.followers.length}</Heading>
                    <Text fontSize="xs" color="RGBA(0, 0, 0, 0.48)">
                        Followers
                    </Text>
                </Box>
                <Box className='flex flex-col items-center justify-center font-inter'>
                    <Heading fontSize="xl">{userData.followings.length}</Heading>
                    <Text fontSize="xs" color="RGBA(0, 0, 0, 0.48)">
                   Followings
                    </Text>
                </Box>
            </Flex>

            <SideBarNav />

            <Spacer />

            <Box display="flex" alignItems="center" gap="2" mb="10px" pl='25px'>
                <Icon as={BsBoxArrowInRight} />
                <StyledNavLink to="/login" onClick={logout}>Log out</StyledNavLink>
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
`;

export default SideBar;

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

function SideBar() {
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    const logout = () => {
        Object.keys(Cookies.get()).forEach(function (cookieName) {
            Cookies.remove(cookieName);
        });
        localStorage.clear();
    };

    const fetchUserData = async () => {
        const username = localStorage.username;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://sugar-cube.onrender.com/user/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Example of adding an authorization header
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

    const fetchUserPosts = async () => {
        const userId = localStorage.userId;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://sugar-cube.onrender.com/post/${userId}`, {
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
            console.error("There was a problem with fetching user posts:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('username');
            if (username) {
                const userData = await fetchUserData(username);
                setUserData(userData);
                localStorage.setItem('name', `${userData.firstName} ${userData.lastName}`);
                const userPostsData = await fetchUserPosts();
                setUserPosts(userPostsData);
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
                    <Heading fontSize="xl">{userPosts.length}</Heading>
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
    display: flex; /* Sử dụng flexbox */
    align-items: center;
    &:hover {
        text-emphasis: none;
        text-decoration: none;
        color: black;
    }
`;

export default SideBar;

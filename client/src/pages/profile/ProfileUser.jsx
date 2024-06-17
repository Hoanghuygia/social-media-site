import { useParams } from "react-router-dom";
import ProfileUserHeader from "./ProfileUserHeader";
import { Flex, Spacer } from '@chakra-ui/react';
import Post from '../home/components/Post';
import { useState, useEffect } from 'react';

function ProfileUser() {
    const { username } = useParams();
    console.log(username);


    return (
    <div className="min-h-screen w-full">
        <div className="">
        <ProfileUserHeader username={username}/>
        </div>
    </div>
    );
}

export default ProfileUser;
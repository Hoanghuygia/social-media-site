import { useParams } from "react-router-dom";
import ProfileUserHeader from "./ProfileUserHeader";
import { useState, useEffect } from 'react';
import Post from '../home/components/Post';
import { Flex, Spacer } from '@chakra-ui/react';

const fetchUserData = async (username) => {
    try {
        const token = localStorage.token;
        const response = await fetch(`https://sugar-cube.onrender.com/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        };

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const fetchUserPosts = async (userId) => {
    try {
        const token = localStorage.token;
        const response = await fetch(`https://sugar-cube.onrender.com/post/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

function ProfileUser() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserAndPosts = async () => {
            try {
                const userData = await fetchUserData(username);
                setUser(userData);

                if (userData && userData._id) {
                    const userPosts = await fetchUserPosts(userData._id);
                    setPosts(userPosts);
                }
            } catch (error) {
                console.error('Error fetching user and posts:', error);
            }
        };

        fetchUserAndPosts();
    }, [username]);

    const handleClickPost = async () => {
        if (user && user._id) {
            await fetchUserPosts(user._id);
        }
    };

    return (
        <div className="min-h-screen w-full">
            <div>
                {user && <ProfileUserHeader username={username} />}
            </div>
            <div className="flex flex-col items-center justify-center pt-[200px] px-4">
                {posts.map((post) => (
                    <Post key={post._id} post={post} onClick={handleClickPost} />
                ))}
                <Spacer />
            </div>
        </div>
    );
}

export default ProfileUser;
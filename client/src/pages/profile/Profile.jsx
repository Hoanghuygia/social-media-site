import ProfileHeader from "./ProfileHeader";
import StatusBar from "./StaturBar";
import { Spacer } from "@chakra-ui/react";
import Post from "../home/components/Post";
import { useState, useEffect } from "react";
import { setCurrentPage } from "../../stores/windowSlice";
import { useDispatch, } from 'react-redux';

function Profile() {
    const [posts, setPosts] = useState([]);
	const dispatch = useDispatch();

    useEffect(() => {
        fetchPosts();
        const intervalid = setInterval(fetchPosts, 3000);
        return () => clearInterval(intervalid);
    }, []);

    const fetchPosts = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        try {
            const token = localStorage.token;
            const response = await fetch(
                `https://sugar-cube.onrender.com/post/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
      dispatch(setCurrentPage("Profile"));
  }, []);

    const handleClickPost = async () => {
        // Assuming you have a function to handle post click actions, such as fetching additional data or updating state
        await fetchPosts(); // Fetch posts again when a post is clicked
    };

    return (
        <div className="min-h-screen w-full">
            <div>
                <ProfileHeader />
            </div>
            <div className="pt-44">
                <StatusBar />
            </div>
            <div className="flex flex-col items-center justify-center px-4">
                {posts.map((post) => (
                    <Post
                        key={post.post._id}
                        post={post}
                        onClick={handleClickPost}
                    />
                ))}
                <Spacer />
            </div>
        </div>
    );
}

export default Profile;

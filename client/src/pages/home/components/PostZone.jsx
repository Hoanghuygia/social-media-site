import React, { useState, useEffect } from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Post from './Post';

function PostZone() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const token = localStorage.token;
        const response = await fetch(`http://localhost:3000/post/followings/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Flex h="100%" w="50%" flexDir="column" gap={2}>
      {posts.map((post) => (
        <Post key={post.post._id} post={post} /> // Correct prop name "post"
      ))}
      <Spacer />
    </Flex>
  );
}

export default PostZone;

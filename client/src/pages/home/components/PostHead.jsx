import React, { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Heading, Text, Icon, Spacer } from '@chakra-ui/react';
import { HiOutlineGlobeAlt, HiOutlineUsers, HiOutlineUser, HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

function PostHead({ channel, time, type }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.token;
        const response = await fetch(`http://localhost:3000/user/${channel}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (channel) { // Ensure channel is defined before fetching user data
      fetchUser();
    }
  }, [channel]);

  const getIconByType = (type) => {
    switch (type) {
      case 'Public':
        return HiOutlineGlobeAlt;
      case 'Following':
        return HiOutlineUsers;
      case 'Private':
        return HiOutlineUser;
      default:
        console.error(`Unknown type: ${type}`);
        throw new Error(`Unknown type: ${type}`);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // or handle loading state
  }

  const icon = getIconByType(type);

  return (
    <Flex flexDir="row" gap={3} marginLeft="30px" mt="10px">
      <Avatar src={user.profilePicture || '/img/avatar.png'} />
      <Box align="left">
        <Heading as="h3" fontSize="lg">
          {user.firstName} {user.lastName}
        </Heading>
        <Text className='font-inter font-extralight text-sm py-1'>
          {time}
          <Icon as={icon} ml="10px" />
        </Text>
      </Box>
      <Spacer />
      <Icon boxSize={6} as={HiOutlineEllipsisHorizontal} mr="10px" />
    </Flex>
  );
}

export default PostHead;

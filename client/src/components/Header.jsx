import { useState, useEffect } from "react";
import {
    Avatar,
    Flex,
    Heading,
    Image,
    Spacer,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import avatar from "/img/avatar.png";



const fetchUserData = async (username) => {
    try {
      const token = localStorage.token;
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

function Header() {
    const [userData, setUserData] = useState({});
    const user = localStorage.username;

    useEffect(() => {
        const fetchUser = async () => {
          const data = await fetchUserData(user);
          console.log(data);
          setUserData(data);
        };
        fetchUser();
      }, [user]);
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

            <Avatar src={userData.profilePicture || avatar} alt="avatar" mr="30px"></Avatar>
        </Flex>
    );
}

export default Header;

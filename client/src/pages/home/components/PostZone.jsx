import { Flex, Spacer, Text } from "@chakra-ui/react";
import Post from "./Post";

const data = [
  {
    channel: "_thepany_a",
    time: "one day ago",
    type: "public",
    content: {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        id dictum neque, id dignissim tellus. In fermentum sagittis
        lorem vehicula blandit`,
      image: "/img/Star.png"
    },
    like: 100,
    comment: 56,
    share: 12
  },
  {
    channel: "phunnee",
    time: "one day ago",
    type: "friend",
    content: {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        id dictum neque, id dignissim tellus. In fermentum sagittis
        lorem vehicula blandit`,
      image: "/img/Sugarcube.png"
    },
    like: 89,
    comment: 34,
    share: 12
  },
  {
    channel: "phunnee",
    time: "one day ago",
    type: "private",
    content: {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        id dictum neque, id dignissim tellus. In fermentum sagittis
        lorem vehicula blandit`,
    },
    like: 100,
    comment: 56,
    share: 12
  }
];

function PostZone() {
  return (
    <Flex h={"100%"} w={"50%"} flexDir={"column"} gap={2}>
      {data.map((postData, index) => ( 
        <Post key={index} data={postData} /> 
      ))}
      <Spacer/>
    </Flex>
  );
}

export default PostZone;

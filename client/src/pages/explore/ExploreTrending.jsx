import { FaHeart, FaRegCommentDots } from "react-icons/fa6";
import  { useEffect, useState } from "react";

import SubNav from "./SubNav";

const ExploreTrending = () => {
  const [data, setData] = useState([]);

  const isVideo = (url) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    const decodedUrl = decodeURIComponent(url);

    const match = decodedUrl.match(/\.([^.?#/\\]+)(?:[?#]|$)/);

    if (!match) return false; // No file extension found

    const extension = match[1].toLowerCase();
    if (videoExtensions.includes(extension)) {
      return true;
    }

    if (imageExtensions.includes(extension)) {
      return false; // Skip images
    }
    return false;
  };

  useEffect(() => {
    const token = localStorage.token;
    fetch("https://sugar-cube.onrender.com/post/", {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then((response) => response.json())
      .then((data) => {
        // Parse the fetched data to match the required format
        const parsedData = data.map((item) => ({
          id: item.post._id,
          channel: item.username,
          description: item.post.content,
          url: item.post.mediaURL,
          likes: item.post.like,
          comment: item.post.comment,
          shares: item.post.share,
        }));
        setData(parsedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter out video data
  const filteredData = data.filter(item => !isVideo(item.url));
  // Group data into chunks of 5
  const groupedData = [];
  for (let i = 0; i < filteredData.length; i += 5) {
    groupedData.push(filteredData.slice(i, i + 5));
  }

  return (
    <div className="min-h-screen max-w-full">
      <SubNav />
      <div className="py-5 px-10 ">
        {groupedData.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="grid grid-cols-3 grid-rows-2 gap-2 mt-2 h-[600px]"
          >
            {group.map((item, index) => (
              <div
                key={item.id}
                className={`relative group ${
                  (groupIndex % 2 === 0 && index === 0) ||
                  (groupIndex % 2 !== 0 && index === 2)
                    ? "col-span-1 row-span-2 h-fit]"
                    : ""
                }`}
              >
                <img
                  src={item.url}
                  alt={`Image ${item.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute flex justify-center gap-20 inset-0 text-pastel-pink-300 bg-black bg-opacity-50 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div>
                    <FaHeart className=" text-3xl " />
                    <span className="font-inter">{item.likes}</span>
                  </div>
                  <div>
                    <FaRegCommentDots className=" text-3xl " />
                    <span className="font-inter">{item.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreTrending;

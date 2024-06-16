import React, { useEffect, useState } from 'react';
import SubNav from './SubNav';
import Video from './Video';

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

function ExploreReels() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.token;
      try {
        const response = await fetch('http://localhost:3000/post/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
        const result = await response.json();
        const videoPosts = result.filter(video => isVideo(video.post.mediaURL));
        setData(videoPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <SubNav />
      <div className="flex-1 h-full relative rounded-xl pl-14 py-10 flex flex-col space-y-10 items-center justify-center">
        {data.map((video, index) => (
          <Video
            key={index}
            channel={video.username}
            description={video.post.content}
            url={video.post.mediaURL}
            likes={video.post.like}
            comment={video.post.comment}
            shares={video.post.share}
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreReels;

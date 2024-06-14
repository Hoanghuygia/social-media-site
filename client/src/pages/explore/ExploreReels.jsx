import React from 'react';
import SubNav from './SubNav';
import Video from './Video';
import reel from './../../assets/img/Reels.mp4';

let data = [
  {
    channel: 'Ban HeeSoo',
    description: 'Lorem ipsum dolor sit amet consectetur. At sapien sem.',
    url: reel,
    likes: '32',
    comment: '2',
    shares: '23',
  },
  {
    channel: 'Ban HeeSoo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    url: reel,
    likes: '32',
    comment: '2',
    shares: '23',
  },
  // Add more video objects here
];

function ExploreReels() {
  return (
    <div className="min-h-screen overflow-hidden">
      <SubNav />
      <div className="flex-1 h-full relative rounded-xl pl-14 py-10 flex flex-col space-y-10 items-center justify-center">
        {data.map((video, index) => (
          <Video
            key={index}
            channel={video.channel}
            description={video.description}
            url={video.url}
            likes={video.likes}
            comment={video.comment}
            shares={video.shares}
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreReels;

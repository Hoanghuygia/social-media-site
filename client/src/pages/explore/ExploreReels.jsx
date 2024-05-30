import SubNav from "./SubNav";
import reel from './../../assets/img/Reels.mp4';
import Video from "./Video";

let data = [
  {
    channel: "Ban HeeSoo",
    description: "Lorem ipsum dolor sit amet consectetur. At sapien sem.",
    url: reel,
    likes: "32",
    comment: "2",
    shares: "23",
  },
  {
    channel: "Ban HeeSoo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    url: reel,
    likes: "32",
    comment: "2",
    shares: "23",
  },
  // Add more video objects here
];

function ExploreReels() {
  return (
    <div className="min-h-screen max-w-full">
      <SubNav />
      <div className="App">
        <div className="relative rounded-xl flex justify-center items-center pl-10 flex-col py-10 gap-10 ">
        {data.map((list, key) => (
       
            <Video
              key={key}
              channel={list.channel}
              description={list.description}
              url={list.url}
              likes={list.likes}
              comment={list.comment}
              shares={list.shares}
            />
  
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreReels;

import { FaHeart, FaRegCommentDots } from "react-icons/fa6";

import SubNav from "./SubNav";
import Img1 from "./../../assets/img/trendImg1.jpg";
import Img2 from "./../../assets/img/trendImg2.jpg";

const ExploreTrending = () => {
  let data = [
    { id: 1, imgSrc: Img2, likes: "200", shares: "399" },
    { id: 2, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 3, imgSrc: Img2, likes: "200", shares: "399" },
    { id: 4, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 5, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 6, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 7, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 8, imgSrc: Img2, likes: "200", shares: "399" },
    { id: 9, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 10, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 11, imgSrc: Img2, likes: "200", shares: "399" },
    { id: 12, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 13, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 14, imgSrc: Img1, likes: "200", shares: "399" },
    { id: 15, imgSrc: Img1, likes: "200", shares: "399" },
    // More data will come from the database later
  ];

  // Group data into chunks of 5
  const groupedData = [];
  for (let i = 0; i < data.length; i += 5) {
    groupedData.push(data.slice(i, i + 5));
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
                  src={item.imgSrc}
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

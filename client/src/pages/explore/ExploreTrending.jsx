import SubNav from "./SubNav";
import Img1 from './../../assets/img/trendImg1.jpg';
import Img2 from './../../assets/img/trendImg2.jpg';

const ExploreTrending = () => {
  let data = [
    { id: 1, imgSrc: Img2 },
    { id: 2, imgSrc: Img1 },
    { id: 3, imgSrc: Img2 },
    { id: 4, imgSrc: Img1 },
    { id: 5, imgSrc: Img1 },
    { id: 6, imgSrc: Img1 },
    { id: 7, imgSrc: Img1 },
    { id: 8, imgSrc: Img2 },
    { id: 9, imgSrc: Img1 },
    { id: 10, imgSrc: Img1 },
    { id: 11, imgSrc: Img2 },
    { id: 12, imgSrc: Img1 },
    { id: 13, imgSrc: Img1 },
    { id: 14, imgSrc: Img1 },
    { id: 15, imgSrc: Img1 },
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
      <div className="py-5 px-10 overflow-y-scroll ">
      {groupedData.map((group, groupIndex) => (
        <div key={groupIndex} className="grid grid-cols-3 grid-rows-2 gap-2 mt-2 h-[600px]">
          {group.map((item, index) => (
            <div
              key={item.id}
              className={`relative ${
                (groupIndex % 2 === 0 && index === 0) || (groupIndex % 2 !== 0 && index === 2)
                  ? "col-span-1 row-span-2 h-fit]"
                  : ""
              }`}
            >
               <img src={item.imgSrc} alt={`Image ${item.id}`} className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
        
      ))}
      </div>
    </div>
  );
};


export default ExploreTrending;
import { Link, useLocation } from "react-router-dom";
import { setCurrentPage } from "../../stores/windowSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const subNav = [
    {
        name: "Reels",
        link: "/explore/reels",
    },
    {
        name: "Trending",
        link: "/explore/trending",
    },
];

const SubNav = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPage("Explore"));
    }, []);

    return (
        <div className="mt-4">
            <div className="justify-center flex">
                {subNav.map((item, index) => (
                    <div
                        id="sub-nav"
                        key={index}
                        className={`bg-pastel-purple-100 odd:rounded-l-3xl even:rounded-r-3xl text-gray-500 hover:bg-pastel-pink-200 cursor-pointer h-[3rem] shadow-inner ${
                            location.pathname === item.link ? `active` : ""
                        }`}
                    >
                        <Link
                            className="px-20 h-[3rem] py-3 flex items-center justify-center font-khumb-sans tracking-wider"
                            to={item.link}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubNav;

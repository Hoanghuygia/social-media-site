// import { Flex, Grid, GridItem} from "@chakra-ui/react";
// import React, { useEffect, useState } from 'react';
// import SideBar from "../components/SideBar/SideBar.jsx";
// import Header from "../components/Header.jsx";
// import { useDispatch, useSelector } from 'react-redux';

// const PageLayout = ({ children }) => {

//     const [sidebarHeight, setSidebarHeight] = useState(0);

//     useEffect(() => {
//         const headerHeight = document.querySelector('.header').offsetHeight;
//         const windowHeight = window.innerHeight;
//         const sidebarHeight = windowHeight - headerHeight;
//         setSidebarHeight(sidebarHeight);
//     }, []);

//     return (
//         <Flex>
//             <Grid
//                 templateAreas={`"header header" "nav main"`}
//                 gridTemplateRows={'12% auto'}
//                 gridTemplateColumns={'25% auto'}
//                 w='100vw'
//             >
//                 <GridItem className='header' bg='white' area={'header'}>
//                     <Header postion='fixed'/>
//                 </GridItem>
//                 <GridItem h={`${sidebarHeight}px`} bg='bg-color.100' area={'nav'} >
//                     <SideBar postion='fixed'/>
//                 </GridItem>
//                 <GridItem bg='red.100' area={'main'}>
//                     {children}
//                 </GridItem>
//             </Grid>
//         </Flex>
//     );
// }

// export default PageLayout;

// src/components/PageLayout.jsx
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar/SideBar.jsx";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {
    const dispatch = useDispatch();

    const { headerHeight, windowHeight, sidebarHeight } = useSelector(
        (state) => ({
            headerHeight: state.headerHeight,
            windowHeight: state.windowHeight,
            sidebarHeight: state.windowHeight - state.headerHeight,
        })
    );
    //we edit here later

    // console.log("Side bar height: " + sidebarHeight);

    useEffect(() => {
        const updateDimensions = () => {
            const headerHeight = document.querySelector(".header").offsetHeight;
            console.log("Header Height: " + headerHeight);
            const headerWidth = document.querySelector(".header").offsetWidth;
            console.log("Header Width: " + headerWidth);
            const windowHeight = window.innerHeight;
            console.log("Window Height: " + windowHeight);
            const windowWidth = window.innerWidth;
            console.log("Window Width: " + windowWidth);

            const mainHeight = windowHeight - document.querySelector('.nav').offsetHeight;
            const mainWidth = windowWidth - document.querySelector('.nav').offsetWidth;
            console.log("Main width: " + mainWidth);

            console.log("huy dep trai");

            dispatch({ type: "SET_HEADER_HEIGHT", payload: headerHeight });
            dispatch({ type: "SET_HEADER_WIDTH", payload: headerWidth });
            dispatch({ type: "SET_WINDOW_HEIGHT", payload: windowHeight });
            dispatch({ type: "SET_WINDOW_WIDTH", payload: windowWidth });
            dispatch({ type: "SET_MAIN_HEIGHT", payload: mainHeight });
            dispatch({ type: "SET_MAIN_WIDTH", payload: mainWidth });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        document.addEventListener("DOMContentLoaded", updateDimensions);

        return () => window.removeEventListener("resize", updateDimensions);
    }, [dispatch]);

    return (
        <Flex>
            <Grid
                templateAreas={`"header header" "nav main"`}
                gridTemplateRows={"12% auto"}
                gridTemplateColumns={"25% auto"}
                w="100vw"
            >
                <GridItem className="header" bg="white" area={"header"}>
                    <Header postion="fixed" />
                </GridItem>
                <GridItem
                    className="nav"
                    h={`${sidebarHeight}px`}
                    bg="bg-color.100"
                    area={"nav"}
                >
                    <SideBar postion="fixed" />
                </GridItem>
                <GridItem bg="red.100" area={"main"}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default PageLayout;

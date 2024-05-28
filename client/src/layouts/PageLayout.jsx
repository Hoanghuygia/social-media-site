import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar/SideBar.jsx";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {
    const dispatch = useDispatch();

    const { navHeight, navWidth } = useSelector((state) => ({
        navHeight: state.navHeight,
        navWidth: state.navWidth,
    }));
    //we edit here later

    useEffect(() => {
        const updateDimensions = () => {
            const headerHeight = document.querySelector(".header").offsetHeight;
            const headerWidth = document.querySelector(".header").offsetWidth;

            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            const mainHeight = document.querySelector(".main").offsetHeight;
            const mainWidth = document.querySelector(".main").offsetWidth;

            const navHeight = windowHeight - mainHeight;
            console.log("Nav Height: " + navHeight);
            const navWidth = windowWidth - mainWidth;
            console.log("Nav Width: " + navWidth);

            dispatch({ type: "SET_HEADER_HEIGHT", payload: headerHeight });
            dispatch({ type: "SET_HEADER_WIDTH", payload: headerWidth });
            dispatch({ type: "SET_WINDOW_HEIGHT", payload: windowHeight });
            dispatch({ type: "SET_WINDOW_WIDTH", payload: windowWidth });
            dispatch({ type: "SET_MAIN_HEIGHT", payload: mainHeight });
            dispatch({ type: "SET_MAIN_WIDTH", payload: mainWidth });
            dispatch({ type: "SET_NAV_HEIGHT", payload: navHeight });
            dispatch({ type: "SET_NAV_WIDTH", payload: navWidth });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        document.addEventListener("DOMContentLoaded", updateDimensions);

        return () => {
            document.removeEventListener("DOMContentLoaded", updateDimensions);
            window.removeEventListener("resize", updateDimensions);
        };
    }, [dispatch]);

    return (
        <Flex>
            <Grid
                templateAreas={`"nav header" "nav main"`}
                gridTemplateRows={"7.25% auto"}
                gridTemplateColumns={"25% 75%"}
                w="100vw"
                overflow="hidden"
            >
                <GridItem
                    className="header"
                    bg="white"
                    area={"header"}
                    ml={"17px"}
                    zIndex={3}
                >
                    <Header />
                </GridItem>
                <GridItem
                    className="nav"
                    h={"100vh"}
                    bg="bg-color.100"
                    area={"nav"}
                    zIndex={2}
                    pos={"fixed"}
                    w={`${navWidth}px`}
                    // pos={"fixed"}
                >
                    <SideBar />
                </GridItem>
                <GridItem
                   
                    area={"main"}
                    className="main"
                    zIndex={1}
                >
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default PageLayout;

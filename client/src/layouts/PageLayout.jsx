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
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            const headerHeight = document.querySelector(".header").offsetHeight;
            const headerWidth = document.querySelector(".header").offsetWidth;
            console.log("Header Height: " + headerHeight)

            const mainHeight = document.querySelector(".main").offsetHeight;
            const mainWidth = document.querySelector(".main").offsetWidth;
            console.log("Main Height: " + mainHeight)

            const navHeight = windowHeight - mainHeight;
            const navWidth = windowWidth - mainWidth;
            console.log("Nav Height: " + navHeight);
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
                gridTemplateRows={"15% auto"}
                gridTemplateColumns={"25% auto"}
                w="100vw"
                h={"100vh"}
                overflowY={"auto"}
                overflowX={"hidden"}
            >
                <GridItem
                    className="header"
                    area={"header"}
                    ml={"15px"}
                    zIndex={3}
                    overflow="hidden"
                >
                    <Header />
                </GridItem>
                <GridItem
                    className="nav"
                    h={"100vh"}
                    bg="bg-color.100"
                    area={"nav"}
                    zIndex={2}
                    // pos={"fixed"}
                    pos={"sticky"}
                    top={0}
                    overflowX="hidden"
                    boxShadow="4px 0px 16px rgba(239, 202, 204, 1)"
                    // w={`${navWidth}px`}
                >
                    <SideBar />
                </GridItem>
                <GridItem
                    area={"main"}
                    className="main"
                    zIndex={1}
                    // overflowY="auto"
                    // overflowX="hidden"
                    // h={"auto"}
                    // h={"85vh"}
                    // minHeight="100%"
                    bg="bg-color.100"
                >
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default PageLayout;

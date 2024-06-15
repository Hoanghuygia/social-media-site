import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import SideBar from "../components/SideBar/SideBar.jsx";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {

    return (
        <Flex>
            <Grid
                templateAreas={`"nav header" "nav main"`}
                gridTemplateRows={"13% auto"}
                gridTemplateColumns={"23% auto"}
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
                    overflow="show"
                >
                    <Header />
                </GridItem>
                <GridItem
                    className="nav"
                    h={"100vh"}
                    bg="bg-color.100"
                    area={"nav"}
                    zIndex={2}
                    pos={"sticky"}
                    top={0}
                    overflowX="hidden"
                    boxShadow="4px 0px 16px rgba(239, 202, 204, 1)"
                >
                    <SideBar />
                </GridItem>
                <GridItem
                    area={"main"}
                    className="main"
                    zIndex={1}
                    bg="bg-color.100"
                >
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default PageLayout;

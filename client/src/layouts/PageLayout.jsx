import { Flex, Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../components/SideBar.jsx";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {

    return (
        <Flex>
            <Grid
                w={"full"}
                h={"100vh"}
                templateAreas={`"nav header"
                  "nav main"`}
                gridTemplateRows={"50px auto "}
                gridTemplateColumns={"240px auto"}
            >
                <GridItem area={"header"} className={" sticky"}>
                    <Header />
                </GridItem>
                <GridItem area={"nav"} className={"left-0 top-0 fixed"}>
                    <SideBar />
                </GridItem>
                <GridItem flex={1} area={"main"} className={"bg-background"}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
};
export default PageLayout;

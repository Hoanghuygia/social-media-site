import { Flex, Grid, GridItem} from "@chakra-ui/react";
import SideBar from "../components/SideBar.jsx";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {

    return (
            <Flex>
                <Grid   
                    templateAreas={`"header header" "nav main"`}
                    gridTemplateRows={'75px auto'}
                    gridTemplateColumns={'300px auto'}
                    w='100vw'
                >
                    <GridItem bg='bg-color.300' area={'header'}>
                        <Header/>
                    </GridItem>
                    <GridItem h='100vh' pl='2' bg='pink.300' area={'nav'}>
                        <SideBar/>
                    </GridItem>
                    <GridItem bg='green.300' area={'main'}>
                        {children}
                    </GridItem>
                </Grid>
            </Flex>
    );
};
export default PageLayout;


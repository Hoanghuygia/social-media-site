import { Flex, Grid, GridItem} from "@chakra-ui/react";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {
    return (
        <Flex>
            <Grid   
                templateAreas={`"header" "main"`}
                gridTemplateRows={'75px auto'}
                w='100vw'
            >
                <GridItem className='header' bg='white' area={'header'}>
                    <Header postion='fixed'/>
                </GridItem>
                <GridItem bg='red.100' area={'main'}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default PageLayout;


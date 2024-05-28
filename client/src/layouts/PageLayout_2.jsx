import { Flex, Grid, GridItem} from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import { useEffect, useState } from "react";

const PageLayout = ({ children }) => {

    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() =>{
        const headerHeight = document.querySelector('.header').offsetHeight;
        const windowHeight = window.innerHeight;
        const contentHeight = windowHeight - headerHeight;
        setContentHeight(contentHeight);
    }, [])

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
                <GridItem bg='red.100' area={'main'} h={`${contentHeight}px`}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default PageLayout;


import { Flex, Grid, GridItem} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar.jsx";
import Header from "../components/Header.jsx";

const PageLayout = ({ children }) => {

    const [sidebarHeight, setSidebarHeight] = useState(0);

    useEffect(() => {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const windowHeight = window.innerHeight;
        const sidebarHeight = windowHeight - headerHeight;
        setSidebarHeight(sidebarHeight);
    }, []);

    return (
        <Flex>
            <Grid   
                templateAreas={`"header header" "nav main"`}
                gridTemplateRows={'75px auto'}
                gridTemplateColumns={'300px auto'}
                w='100vw'
            >
                <GridItem className='header' bg='white' area={'header'}>
                    <Header postion='fixed'/>
                </GridItem>
                <GridItem h={`${sidebarHeight}px`} bg='bg-color.100' area={'nav'} >
                    <SideBar postion='fixed'/>
                </GridItem>
                <GridItem bg='purple.500' area={'main'}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default PageLayout;


import { Flex, Grid, GridItem} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar/SideBar.jsx";
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
        <Flex >
            <Grid 
                templateAreas={`"header header" "nav main"`}
                gridTemplateRows={'75px auto'}
                gridTemplateColumns={'300px auto' }
                w='100vw'
            >
                <GridItem className='header sticky min-h-20 flex flex-col' area={'header'}>
                    <Header/>
                </GridItem>
                <GridItem h={`${sidebarHeight}px`} className="bg-pastel-pink-100 sticky" area={'nav'} >
                    <SideBar/>
                </GridItem>
                <GridItem className=" bg-pastel-pink-100" area={'main'}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default PageLayout;


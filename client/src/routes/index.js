import {Home, Message, Notification, Profile, Login, Signup, ExploreReels, ExploreTrending} from './../pages/index.js';
import { PageLayout } from '../layouts/index.js';
import { layout } from '@chakra-ui/react';

const publicRoutes = [
    { path: '/', component: Home, layout: PageLayout},
    { path: '/message', component: Message, layout: PageLayout},
    { path: '/explore/reels', component: ExploreReels, layout: PageLayout},
    { path: '/notification', component: Notification, layout: PageLayout},
    { path: '/profile', component: Profile, layout: PageLayout},
    { path: '/explore/trending', component: ExploreTrending, layout: PageLayout},
    { path: '/login', component: Login, layout: null},
    { path: '/signup', component: Signup, layout: null},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes}
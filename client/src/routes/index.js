import {Home, Message, ExploreReels, ExploreTrending, ProfileDetail, Notification, Profile, Login, Signup} from './../pages/index.js';
import { PageLayout } from '../layouts/index.js';
import { PageLayout_2 } from '../layouts/index.js';

const publicRoutes = [
    { path: '/', component: Home, layout: PageLayout},
    { path: '/message', component: Message, layout: PageLayout},
    { path: '/explore/reels', component: ExploreReels, layout: PageLayout},
    { path: '/notification', component: Notification, layout: PageLayout},
    { path: '/profile', component: Profile, layout: PageLayout},
    { path: '/explore/trending', component: ExploreTrending, layout: PageLayout},
    { path: '/login', component: Login, layout: null},
    { path: '/signup', component: Signup, layout: null},
    { path: '/profile/detail', component: ProfileDetail, layout: PageLayout_2},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes}
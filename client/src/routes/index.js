import {Home, Message, Explore, Notification, Profile} from './../pages/index.js';
import { PageLayout } from '../layouts/index.js';

const publicRoutes = [
    { path: '/', component: Home, layout: PageLayout},
    { path: '/message', component: Message, layout: PageLayout},
    { path: '/explore', component: Explore, layout: PageLayout},
    { path: '/notification', component: Notification, layout: PageLayout},
    { path: '/profile', component: Profile, layout: PageLayout},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes}
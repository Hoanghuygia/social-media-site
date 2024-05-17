import {Home, Message, Explore, Notification, Profile, Login, Signup} from './../pages/index.js';
import { PageLayout } from '../layouts/index.js';

const publicRoutes = [
    { path: '/', component: Home, layout: PageLayout},
    { path: '/message', component: Message, layout: PageLayout},
    { path: '/explore', component: Explore, layout: PageLayout},
    { path: '/notification', component: Notification, layout: PageLayout},
    { path: '/profile', component: Profile, layout: PageLayout},
    { path: '/login', component: Login, layout: null},
    { path: '/signup', component: Signup, layout: null},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes}
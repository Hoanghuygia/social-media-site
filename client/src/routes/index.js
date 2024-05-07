import {Home, Message} from './../pages/index.js';
import { PageLayout } from '../layouts/index.js';

const publicRoutes = [
    { path: '/', component: Home, layout: PageLayout},
    { path: '/message', component: Message, layout: PageLayout},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes}
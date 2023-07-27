import Home from '../Pages/Home';
import AboutUsPage from '../Pages/AboutUsPage';
import TourPage from '../Pages/TourPage';
import config from '../config';

export const privateRoutes = [];
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.aboutUs, component: AboutUsPage },
    { path: config.routes.tour, component: TourPage },
];

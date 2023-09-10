import Home from '../Pages/Home';
import AboutUsPage from '../Pages/AboutUsPage';
import TourPage from '../Pages/TourPage';
import config from '../config';
import LoginPage from '../Pages/LoginPage';
import StaffPage from '../Pages/StaffPage';
import RegisterPage from '../Pages/RegisterPage';
import TourDetail from '../Pages/TourDetail/TourDetail';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
export const privateRoutes = [];
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.aboutUs, component: AboutUsPage },
    { path: config.routes.tour, component: TourPage },
    { path: config.routes.tourCategory, component: TourPage },
    { path: config.routes.tourDetail, component: TourDetail },
    { path: config.routes.profile, component: ProfilePage },
    { path: config.routes.staff, component: StaffPage },
    { path: config.routes.login, component: LoginPage },
    { path: config.routes.register, component: RegisterPage },
];

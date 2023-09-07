import Home from '../Pages/Home';
import AboutUsPage from '../Pages/AboutUsPage';
import TourPage from '../Pages/TourPage';
import config from '../config';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import TourDetail from '../Pages/TourDetail/TourDetail';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import PaymentPage from '../Pages/PaymentPage/PaymentPage';
export const privateRoutes = [];
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.aboutUs, component: AboutUsPage },
    { path: config.routes.tour, component: TourPage },
    { path: config.routes.tourCategory, component: TourPage },
    { path: config.routes.tourDetail, component: TourDetail },
    { path: config.routes.profile, component: ProfilePage },
    { path: config.routes.payment, component: PaymentPage },
    { path: config.routes.login, component: LoginPage },
    { path: config.routes.register, component: RegisterPage },
];

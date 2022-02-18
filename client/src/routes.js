import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: `${DEVICE_ROUTE}/:id`,
        Component: DevicePage
    }
]
export const adminRoutes = [
    ...authRoutes,
    ...publicRoutes,
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },]

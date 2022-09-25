import Home from "../page/home";
import My404Component from "../page/404";
import Construction from "../page/construction";
import SignUp from "../page/authorization/signup";
import Login from "../page/authorization/login";
import RegisterWithUs from "../page/authorization/registeredWithUs";
import Booking from "../page/address";

export const publicRoutes = [
  {
    path: "/",
    component: Booking,
    exact: true,
  },
  {
    path: "/address",
    component: Booking,
    exact: true,
  },

  {
    path: "*",
    component: My404Component,
    exact: true,
  },
];

export const AuthenticationRoutes = [
  {
    path: "/signup",
    component: SignUp,
    exact: false,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/user-details",
    component: RegisterWithUs,
    exact: true,
  },
  {
    path: "*",
    component: Login,
    exact: true,
  },
];

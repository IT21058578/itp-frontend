import Home from "../page/home";
import My404Component from "../page/404";
import Construction from "../page/construction";
import Stock from "../page/stock";
import AddStock from "../page/stock/addStock";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/stock",
    component: Stock,
    exact: true,
  },
  {
    path: "/add-stock",
    component: AddStock,
    exact: true,
  },
  {
    path: "*",
    component: My404Component,
    exact: true,
  },
];

import React from "react";

// Admin Imports
import MainDashboard from "./views/default/index";
import Products from "./views/products/index";
import Profile from "./views/profile/index";
import Sales from "./views/sales/index";
import Orders from "./views/orders/index"

import {
  MdBarChart,
  MdPerson,
  MdDashboard,
  MdAssignment
} from "react-icons/md";

import { FaListUl } from 'react-icons/fa';


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: MdDashboard,
    component: MainDashboard,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: FaListUl,
    component: Products,
    secondary: true,
  },
  {
    name: "Sales",
    layout: "/admin",
    icon: MdBarChart,
    path: "sales",
    component: Sales,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: MdPerson,
    component: Profile,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: MdAssignment,
    component: Orders,
  },
];

export default routes;

/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignOut from "layouts/authentication/sign-out";
import Places from "layouts/places";

// @mui icons
import Icon from "@mui/material/Icon";
import Categories from "layouts/categories";
import AddCategory from "layouts/categories/AddCategory";
import EditCategory from "layouts/categories/EditCategory";
import AddPlace from "layouts/places/AddPlace";
import EditPlace from "layouts/places/EditPlace";
import Admins from "layouts/admins";
import AddAdmin from "layouts/admins/AddAdmin";
import EditAdmin from "layouts/admins/EditAdmin";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    requiresAuth: true,
    inSideNav: true,
  },
  {
    type: "collapse",
    name: "Places",
    key: "places",
    icon: <Icon fontSize="small">storefront</Icon>,
    route: "/places",
    component: <Places />,
    requiresAuth: true,
    inSideNav: true,
  },
  {
    type: "collapse",
    name: "Add Place",
    key: "add-place",
    icon: <Icon fontSize="small">grid_on</Icon>,
    route: "/places/add",
    component: <AddPlace />,
    requiresAuth: true,
    inSideNav: false,
  },
  {
    type: "collapse",
    name: "Edit Place",
    key: "edit-place",
    icon: <Icon fontSize="small">grid_on</Icon>,
    route: "/places/edit/:id",
    component: <EditPlace />,
    requiresAuth: true,
    inSideNav: false,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <Icon fontSize="small">grid_on</Icon>,
    route: "/categories",
    component: <Categories />,
    requiresAuth: true,
    inSideNav: true,
  },
  {
    key: "add-category",
    route: "/categories/add",
    component: <AddCategory />,
    requiresAuth: true,
    inSideNav: false,
  },
  {
    key: "add-category",
    route: "/categories/edit/:id",
    component: <EditCategory />,
    requiresAuth: true,
    inSideNav: false,
  },
  {
    type: "collapse",
    name: "Admins",
    key: "admins",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/admins",
    component: <Admins />,
    requiresAuth: true,
    inSideNav: true,
  },
  {
    key: "add-admin",
    route: "/admins/add",
    component: <AddAdmin />,
    requiresAuth: true,
    inSideNav: false,
  },
  {
    key: "add-admin",
    route: "/admins/edit/:id",
    component: <EditAdmin />,
    requiresAuth: true,
    inSideNav: false,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  //   requiresAuth: true,
  //   inSideNav: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  //   requiresAuth: true,
  //   inSideNav: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  //   requiresAuth: true,
  //   inSideNav: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  //   requiresAuth: true,
  //   inSideNav: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  //   requiresAuth: true,
  //   inSideNav: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/sign-in",
  //   component: <SignIn />,
  //   requiresAuth: false,
  //   inSideNav: true,
  // },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    icon: <Icon fontSize="small">power_settings_new</Icon>,
    route: "/sign-out",
    component: <SignOut />,
    requiresAuth: true,
    inSideNav: true,
  },
];

export default routes;

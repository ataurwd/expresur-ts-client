import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Admin_Consolidations from "../dashboard/admin-dashboard/Admin_Consolidations";
import Admin_Cuba from "../dashboard/admin-dashboard/Admin_Cuba";
import Admin_Packages from "../dashboard/admin-dashboard/Admin_Packages";
import Admin_Payments from "../dashboard/admin-dashboard/Admin_Payments";
import Admin_Pickup from "../dashboard/admin-dashboard/Admin_Pickup";
import Admin_Rates from "../dashboard/admin-dashboard/Admin_Rates";
import Admin_Reports from "../dashboard/admin-dashboard/Admin_Reports";
import Admin_Settings from "../dashboard/admin-dashboard/Admin_Settings";
import Admin_Shipments from "../dashboard/admin-dashboard/Admin_Shipments";
import Admin_Tracking from "../dashboard/admin-dashboard/Admin_Tracking";
import Consolidate from "../dashboard/user-dashboard/Consolidate";
import CreateShipment from "../dashboard/user-dashboard/CreateShipment";
import CubaShipping from "../dashboard/user-dashboard/CubaShipping";
import Locker from "../dashboard/user-dashboard/Locker";
import Packages from "../dashboard/user-dashboard/Packages";
import Payments from "../dashboard/user-dashboard/Payments";
import Pickup from "../dashboard/user-dashboard/Pickup";
import Profile from "../dashboard/user-dashboard/Profile";
import Shipments from "../dashboard/user-dashboard/Shipments";
import Dashboard from "../layout/Dashboard";
import Home from "../pages/home/Home";
import OnlineStore from "../pages/onile-store/OnlineStore";
import Quienessomos from "../pages/Quienessomos/Quienessomos";
import RastrearPage from "../pages/rastrear-page/RastrearPage";
import RecogidaPage from "../pages/Recogida/Recogida";
import Login from "../users/Login";
import Register from "../users/Register";
import Users from "./../dashboard/admin-dashboard/Users";
import Layout from "../layout/Layout";
import Admin_Admins from "../dashboard/admin-dashboard/Admin_Admins";




const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/quiénes-somos",
        element: <Quienessomos />,
      },
      {
        path: "/rasterear",
        element: <RastrearPage />,
      },
      {
        path: "/tienda",
        element: <OnlineStore />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:"/recogida",
        element: <RecogidaPage/>
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // {
      //   path: "admin-dashboard",
      //   element: <AdminDashboard/>
      // },
      // {
      //   path: "user-dashboard",
      //   element: <UserDashboard/>
      // },
      {
        path: "locker",
        element: <Locker/>
      },
      {
        path: "packages",
        element: <Packages/>
      },
      {
        path: "consolidate",
        element: <Consolidate/>
      },
      {
        path: "shipments",
        element: <Shipments/>
      },
      {
        path: "create-shipment",
        element: <CreateShipment/>
      },
      {
        path: "cuba-shipping",
        element: <CubaShipping/>
      },
      {
        path: "pickup",
        element: <Pickup/>
      },
      {
        path: "payments",
        element: <Payments/>
      },
      {
        path: "profile",
        element: <Profile/>
      },

      // admin routes can be added here
      {
        path: "admins",
        element: <Admin_Admins/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "rates",
        element: <Admin_Rates/>
      },
       {
        path: "settings",
        element: <Admin_Settings/>
      },
      {
        path: "consolidations",
        element: <Admin_Consolidations/>
      },
      {
        path: "cuba",
        element: <Admin_Cuba/>
      },
      {
        path: "packages",
        element: <Admin_Packages/>
      },
      {
        path: "payments",
        element: <Admin_Payments/>
      },
      {
        path: "pickup",
        element: <Admin_Pickup/>
      },
      {
        path: "reports",
        element: <Admin_Reports/>
      },
      {
        path: "shipments",
        element: <Admin_Shipments/>
      },
      {
        path: "tracking",
        element: <Admin_Tracking/>
      },
      
    ]
  }
]);

export default Routes;
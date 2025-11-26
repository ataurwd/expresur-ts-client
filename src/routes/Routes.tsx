import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import ErrorPage from "../components/ErrorPage";
import Quienessomos from "../pages/Quienessomos/Quienessomos";
import RastrearPage from "../pages/rastrear-page/RastrearPage";
import OnlineStore from "../pages/onile-store/OnlineStore";
import Dashboard from "../layout/Dashboard";
import AdminDashboard from "../dashboard/admin-dashboard/AdminDashboard";
import UserDashboard from "../dashboard/user-dashboard/UserDashboard";
import Login from "../users/Login";
import Register from "../users/Register";
import RecogidaPage from "../pages/Recogida/Recogida";
import Locker from "../dashboard/user-dashboard/Locker";
import Packages from "../dashboard/user-dashboard/Packages";
import Consolidate from "../dashboard/user-dashboard/Consolidate";
import Shipments from "../dashboard/user-dashboard/Shipments";
import CreateShipment from "../dashboard/user-dashboard/CreateShipment";
import CubaShipping from "../dashboard/user-dashboard/CubaShipping";
import Pickup from "../dashboard/user-dashboard/Pickup";
import Payments from "../dashboard/user-dashboard/Payments";
import Profile from "../dashboard/user-dashboard/Profile";




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
      {
        path: "admin-dashboard",
        element: <AdminDashboard/>
      },
      {
        path: "user-dashboard",
        element: <UserDashboard/>
      },
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
      
    ]
  }
]);

export default Routes;

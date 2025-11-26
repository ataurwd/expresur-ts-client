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
        element: <OnlineStore/>,
      }
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
      }
    ]
  }
]);

export default Routes;

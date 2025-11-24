import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import ErrorPage from "../components/ErrorPage";
import Quienessomos from "../pages/Quienessomos/Quienessomos";


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
        path: "/quienessomos",
        element: <Quienessomos />,
      },
    ],
  },
]);

export default Routes;

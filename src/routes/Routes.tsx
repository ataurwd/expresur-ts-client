import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
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
// import OnlineStore from "../pages/onile-store/OnlineStore";
import CasilleroVirtual from "../CasilleroVirtual/CasilleroVirtual";
import AdminAdmins from "../dashboard/admin-dashboard/AdminAdmins";
import AdminConsolidations from "../dashboard/admin-dashboard/AdminConsolidations";
import AdminPackages from "../dashboard/admin-dashboard/AdminPackages";
import AdminPayments from "../dashboard/admin-dashboard/AdminPayments";
import AdminPickup from "../dashboard/admin-dashboard/AdminPickup";
import AdminRates from "../dashboard/admin-dashboard/AdminRates";
import AdminReports from "../dashboard/admin-dashboard/AdminReports";
import AdminSettings from "../dashboard/admin-dashboard/AdminSettings";
import AdminShipments from "../dashboard/admin-dashboard/AdminShipments";
import AdminTracking from "../dashboard/admin-dashboard/AdminTracking";
import DashbordUser from "../dashboard/user-dashboard/DashbordUser";
import Layout from "../layout/Layout";
import CasilleroEscritorio from "../pages/casillero escritorio/casilleroescritorio";
import Contact from "../pages/Contact/Contact";
import FaqMAin from "../pages/FAQPage/FaqMAin";
import Nuestros from "../pages/Nuestros/Nuestros";
import Quienessomos from "../pages/Quienessomos/Quienessomos";
import RastrearPage from "../pages/rastrear-page/RastrearPage";
import RecogidaPage from "../pages/Recogida/Recogida";
import Login from "../users/Login";
import Register from "../users/Register";
import Users from "./../dashboard/admin-dashboard/Users";
import AdminLocker from "../dashboard/admin-dashboard/AdminLocker";
import AdminLogistic from "../dashboard/admin-dashboard/AdminLogistic";
import AdminQrCode from "../dashboard/admin-dashboard/AdminQrCode";
import AdminWallet from "../dashboard/admin-dashboard/AdminWallet";
import AdminNotifications from "../dashboard/admin-dashboard/AdminNotifications";
import AdminAudit from "../dashboard/admin-dashboard/AdminAudit";
import AdminApi from "../dashboard/admin-dashboard/AdminApi";
import Remittances from "../dashboard/user-dashboard/Remittances";
import Notification from "../dashboard/user-dashboard/Notification";
import InternalUsersRoles from "../dashboard/admin-dashboard/InternalUsersRoles";
import Waehouse from "../layout/waehouse";
import Intake from "../dashboard/Warhouse-operations/Intake"
import ScanningCenter from "../dashboard/Warhouse-operations/ScanningCenter";
import Inwarehousepackages from "../dashboard/Warhouse-operations/Inwarehousepackages";
import Pendingreview from "../dashboard/Warhouse-operations/pendingreview";
import Readyforconsolidation from "../dashboard/Warhouse-operations/readyforconsolidation";
import Readyforshipment from "../dashboard/Warhouse-operations/readyforshipment";

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
         path: "/CasilleroVirtual",
        element: <CasilleroVirtual/>
      },
      {
        path: "/rasterear",
        element: <RastrearPage />,
      },
      //   {
      //     path: "/tienda",
      //     element: <OnlineStore />,
      //   },

      {
        path: "/faqpage",
        element: <FaqMAin/>
      },
      {
        path: "/contacto",
        element: <Contact />,
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
        path: "/recogida",
        element: <RecogidaPage />,
      },
      {
        path: "/nuestros",
        element: <Nuestros />,
      },
      {
        path: "/casilleroescritorio",
        element: <CasilleroEscritorio />,
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
        element: <Locker />,
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "user-dashboard",
        element: <DashbordUser />,
      },
      {
        path: "consolidate",
        element: <Consolidate />,
      },
      {
        path: "shipments",
        element: <Shipments />,
      },
      {
        path: "create-shipment",
        element: <CreateShipment />,
      },
      {
        path: "cuba-shipping",
        element: <CubaShipping />,
      },
      {
        path: "pickup",
        element: <Pickup />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
        {
        path: "remittances",
        element: <Remittances />,
      },
         {
        path: "notifications",
        element: <Notification/>,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // admin routes can be added here
      {
        path: "admin",
        element: <AdminAdmins />,
      },
      {
        path: "admin-users",
        element: <Users />,
      },
      {
        path:"admin-wallet",
        element: <AdminWallet/>,
      },
       {
        path:"audit-logs",
        element: <AdminAudit/>,
      },
      {
        path:"api-integrations",
        element: <AdminApi/>
      },
      {
        path: "admin-rates",
        element: <AdminRates />,
      },
      {
        path: "admin-settings",
        element: <AdminSettings />,
      },
      {
        path: "admin-consolidations",
        element: <AdminConsolidations />,
      },
     // {
     //  path: "admin-cuba",
     // element: <AdminCuba />,
     //},
      {
        path: "admin-packages",
        element: <AdminPackages />,
      },
      {
        path: "admin-payments",
        element: <AdminPayments />,
      },
      {
        path: "admin-pickup",
        element: <AdminPickup />,
      },
      {
        path: "admin-reports",
        element: <AdminReports />,
      },
      {
        path: "admin-notifications",
        element: <AdminNotifications />,
      },
      {
        path: "admin-shipments",
        element: <AdminShipments />,
      },
      {
        path: "admin-tracking",
        element: <AdminTracking />,
      },
      {
        path: "admin-locker",
        element: <AdminLocker/>,
      },
      {
        path: "logistic-group",
        element: <AdminLogistic/>,
      },
      {
        path: "qr-scanning",
        element: <AdminQrCode/>,
      },
       {
        path: "internal-users",
        element: <InternalUsersRoles/>,
      },
      {
        
      }
    ],
  },
{
    path: "warehouse",
    element: <Waehouse />, // এই কম্পোনেন্টের ভেতরেই ড্যাশবোর্ড থাকবে
    children: [
       {
         index: true,
         element: <Intake />,
       },
       {
         path: "intake",
         element: <Intake />,
       },
       {
         path: "ScanningCenter",
         element: <ScanningCenter/>,
       },
       {
         path: "inwarehousepackages",
         element: <Inwarehousepackages />,
       },
       {
         path: "pendingreview",
         element: <Pendingreview />,
       },
       {
         path: "readyforconsolidation",
         element: <Readyforconsolidation />,
       },
       {
         path: "readyforshipment",
         element: <Readyforshipment />,
       },
    ],
},
  {
    // Accept capitalized URL and redirect to the lowercase route
    path: "warehouse ",
    element: <Navigate to="/warehouse /intake" replace />,
  },
 
]);

export default Routes;

import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboard from "../dashboard/user-dashboard/UserDashboard";
import AdminSidebar from "../dashboard/admin-dashboard/AdminDashboard";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <AdminSidebar />
        {/* <UserDashboard /> */}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

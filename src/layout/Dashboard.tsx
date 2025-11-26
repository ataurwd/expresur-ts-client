import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboard from "../dashboard/user-dashboard/UserDashboard";

const Dashboard = () => {
  return (
    <div>
      <div>
        welcome to dashboard
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

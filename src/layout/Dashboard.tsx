import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboard from "../dashboard/user-dashboard/UserDashboard";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        welcome to the User 
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

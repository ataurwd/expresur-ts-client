import React from 'react';
import { useCurrentUser } from "../context/useCurrentUser";
import { Outlet } from "react-router-dom";
import WarhouseDashboard from '../dashboard/Warhouse-operations/warhouseDashord';

const Waehouse = () => {
     const newUser = useCurrentUser();
      console.log(newUser?.role)
    return (
          <div className="flex">
              <div>
               {newUser?.role === "warehouse" ? <WarhouseDashboard /> : ''}

              </div>
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
    );
};

export default Waehouse;
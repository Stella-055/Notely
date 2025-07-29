import Drawer from "@/components/Drawer";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <Drawer />
      <Outlet />
    </div>
  );
};

export default Dashboard;

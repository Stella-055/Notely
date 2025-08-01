import DrawerSidenav from "@/components/Drawer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <DrawerSidenav />
      <Outlet />
    </div>
  );
};

export default Dashboard;

import SideNav from "@/components/SideNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default Dashboard;

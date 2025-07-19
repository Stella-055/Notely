import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

const Common = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Common;

import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import useUser from "@/stores/userStore";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { ImWondering } from "react-icons/im";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GoPackageDependencies } from "react-icons/go";
import { SiEnterprisedb } from "react-icons/si";
const Nav = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{ width: 250, py: 7, px: 4 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div className="flex ">
        <a href="/" className="flex gap-2.5">
          <img src="/notelylogo.png" alt="logo" className="w-9" />
          <h2 className="text-2xl text-blue-700 font-extrabold">
            Note{" "}
            <span className="text-2xl font-extrabold text-blue-400">ly</span>
          </h2>{" "}
        </a>
      </div>{" "}
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/whynotely">
            <ListItemIcon>
              <ImWondering />
            </ListItemIcon>
            <ListItemText primary="Why Notely" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/enterprise">
            <ListItemIcon>
              <SiEnterprisedb />
            </ListItemIcon>
            <ListItemText primary="Enterprise" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/Plans">
            <ListItemIcon>
              <GoPackageDependencies />
            </ListItemIcon>
            <ListItemText primary="Plans" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {user ? (
        <div className="flex mt-2">
          <Button variant="contained" href="/dashboard">
            Dashboard
          </Button>
        </div>
      ) : (
        <div className="  gap-2 justify-center items-center flex flex-col mt-2">
          <NavLink to="/signin" className="font-bold">
            Login
          </NavLink>
          <Button variant="contained" href="/register">
            Start Free
          </Button>
        </div>
      )}
    </Box>
  );

  return (
    <nav className="flex justify-around w-full py-5 border-b-black border-b fixed bg-gray-100 z-50 ">
      <NavLink to="/">
        <div className="flex gap-2.5">
          <img src="/notelylogo.png" alt="logo" className="w-9" />
          <h2 className="text-2xl text-blue-700 font-extrabold">
            Note{" "}
            <span className="text-2xl font-extrabold text-blue-400">ly</span>
          </h2>{" "}
        </div>{" "}
      </NavLink>

      <div className="hidden justify-between font-sans w-64 sm:flex">
        <NavLink
          to="/whynotely "
          className={({ isActive }) => (isActive ? "" : "group ")}
        >
          Why Notely
          <div className=" bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300">
            {" "}
          </div>
        </NavLink>
        <NavLink
          to="/enterprise"
          className={({ isActive }) => (isActive ? "" : "group")}
        >
          Enterprise{" "}
          <div className=" bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300">
            {" "}
          </div>
        </NavLink>
        <NavLink
          to="/plans"
          className={({ isActive }) => (isActive ? "" : "group")}
        >
          Plans{" "}
          <div className=" bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300">
            {" "}
          </div>
        </NavLink>
      </div>
      <div className="flex sm:hidden items-center">
        <IoMenu
          size={30}
          color="#3B82F6
"
          onClick={toggleDrawer(true)}
        />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {user ? (
        <div className="hidden sm:flex">
          <Button variant="contained" href="/dashboard">
            Dashboard
          </Button>
        </div>
      ) : (
        <div className=" hidden gap-2 justify-center items-center sm:flex">
          <NavLink to="/signin" className="font-bold">
            Login
          </NavLink>
          <Button variant="contained" href="/register">
            Start Free
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Nav;

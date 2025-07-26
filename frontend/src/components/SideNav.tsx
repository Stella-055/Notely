import { NavLink } from "react-router-dom";
import { RiGalleryView2 } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { FaBookmark } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Divider from "@mui/material/Divider";
import { TbSettings } from "react-icons/tb";
import { TbHelpCircleFilled } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@mui/material";
import api from "@/Api/axios";
import { toast } from "sonner";
import axios from "axios";
import useUser from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const{logoutuser}=useUser()
  const navigate=useNavigate()
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: async () => {
      const response = await api.post("/auth/logout");

      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
        });
      }
    },
    onSuccess: () => {
      navigate("/")
    logoutuser()
    },
  });

function handlelogout(){
mutate()
}

  return (
    
 
   
    <div className=" flex-col bg-blue-500 h-screen p-4 pt-7 justify-between sm:flex hidden">
      <div className="flex flex-col justify-between  h-80 ">
        <a href="/">
          <div className="flex gap-2.5 rounded-2xl">
            <img
              src="/notelylogo.png"
              alt="logo"
              className="w-9 bg-white rounded-2xl p-2"
            />
            <h2 className="text-2xl text-white font-extrabold">Notely</h2>{" "}
          </div>{" "}
        </a>
        <Divider
          orientation="horizontal"
          sx={{ width: "10rem", backgroundColor: "white", height: "0.5px" }}
        />
        <div className="flex flex-col gap-4 justify-center ">
          <NavLink
            to="/dashboard"
            className="text-white flex font-medium items-center"
          >
            {" "}
            Overview <RiGalleryView2 color="white" size={20} />
          </NavLink>
          <NavLink
            to="/dashboard/notes"
            className="text-white flex items-center"
          >
            {" "}
            Notes <FaNotesMedical color="white" size={20} />
          </NavLink>
          <NavLink to="/dashboard/workspace" className="text-white flex items-center">
            {" "}
            Workspace <VscWorkspaceTrusted color="white" size={20} />
          </NavLink>

          <NavLink
            to="/dashboard/bookmark"
            className="text-white flex items-center"
          >
            {" "}
            Bookmark <FaBookmark color="white" size={15} />{" "}
          </NavLink>
          <NavLink
            to="/dashboard/trash"
            className="text-white flex items-center"
          >
            {" "}
            Trash <FaTrash color="white" size={15} />
          </NavLink>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none">
              {" "}
              <h1 className="text-white flex font-medium items-center">
                Settings <TbSettings color="white" size={20} />
              </h1>{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <NavLink to="/dashboard/profile"> Profile</NavLink>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <NavLink to="/dashboard/updatepassword"> Password</NavLink>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuItem><NavLink to="/dashboard/security"> Security & privacy </NavLink></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>{" "}
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Divider
          orientation="horizontal"
          sx={{ width: "10rem", backgroundColor: "white", height: "0.5px" }}
        />
        <NavLink to="/dashboard/help" className="text-white flex items-center">
          {" "}
          <TbHelpCircleFilled color="white" size={18} />
          Help
        </NavLink>
        <Button
          variant="contained"
          size="small"
          sx={{ border: 1, borderColor: "white" }}
          onClick={handlelogout}
          loading={isPending}
          startIcon={<IoIosLogOut />}
        >
          Logout
        </Button>
      </div>
    </div> 
  );
};

export default SideNav;

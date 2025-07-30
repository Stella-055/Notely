import Avatar from "@mui/material/Avatar";
import { useQuery } from "@tanstack/react-query";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import api from "@/Api/axios";
import {Drawer} from "@mui/material";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import SideNav from "@/components/SideNav";
const Usernav = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { data } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data.user;
    },
  });

  return (
    <div className="flex justify-between bg-white w-full p-4">
      <div className="flex items-center">
         <div className="flex sm:hidden py-4 bg-white ">
                  <TiThMenu
                    color="#3B82F6 "
                    onClick={toggleDrawer(true)}
                    size="30"
                  />
                   <Drawer open={open} onClose={toggleDrawer(false)}>
                  
              <SideNav/>
            
                        </Drawer>
                </div>
        <div className="flex items-center border-b gap-2 border-gray-500/30 h-[40px] overflow-hidden max-w-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Find a Note"
            className="w-full h-full outline-none placeholder-gray-500 text-gray-500 bg-transparent text-sm"
          />
         
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        {data?.profileImg ? (
          <Avatar
            alt={data?.username || "user"}
            sx={{ width: 30, height: 30 }}
            src={data?.profileImg || ""}
          />
        ) : (
          <Avatar sx={{ bgcolor: "gray" }}>
            {data ? (data?.username).slice(0, 1) : "User".slice(0, 1)}
          </Avatar>
        )}
        Hi {data?.username || "user"}
        <IoNotificationsCircleOutline size={20} />{" "}
      </div>
    </div>
  );
};

export default Usernav;

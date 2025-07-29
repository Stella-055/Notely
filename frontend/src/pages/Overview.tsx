import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { IoAddCircleSharp } from "react-icons/io5";
import Card from "@mui/material/Card";
import { TiThMenu } from "react-icons/ti";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";
import { MdOutlineEditNote } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { TiPinOutline } from "react-icons/ti";
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import dayjs from "dayjs";
import { BsBookmarkStar } from "react-icons/bs";
import { HashLoader } from "react-spinners";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/Api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { toast } from "sonner";

import SideNav from "@/components/SideNav";
function Overview() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [searchvalue, setSearchvalue] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-enteries"],
    queryFn: async () => {
      const response = await api.get("/entries");
      return response.data.entries;
    },
  });
  const userdet = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data.user;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete:note"],
    mutationFn: async (noteid: string) => {
      const response = await api.delete(`/entry/${noteid}`);
      console.log(response.data);
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
      toast.success("Deleted note successfully", {
        position: "top-center",
      });
    },
  });
  const [isopen, setIsOpen] = useState(false);
  type Entry = {
    id: string;
    userId: string;
    genre: string;
    title: string;
    synopsis: string;
    content: string;
    isPublished: boolean;
    createdAt: string;
    isBookmarked: boolean;
    isPinned: boolean;
  };
  const removebookmark = useMutation({
    mutationKey: ["unbookmark:note"],
    mutationFn: async (noteid: string) => {
      const response = await api.patch(`/entries/bookmark/${noteid}`);

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
      toast.success("Removed Note from bookmarks successfully", {
        position: "top-center",
      });
    },
  });
  const addbookmark = useMutation({
    mutationKey: ["addbookmark:note"],
    mutationFn: async (noteid: string) => {
      const response = await api.post(`/entries/bookmark/${noteid}`);

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
      toast.success("Added Note to bookmarks successfully", {
        position: "top-center",
      });
    },
  });
  const filteredNotes =
    searchvalue.trim() !== ""
      ? data?.filter(
          (entry: Entry) =>
            entry.title.toLowerCase().includes(searchvalue.toLowerCase()) ||
            entry.synopsis.toLowerCase().includes(searchvalue.toLowerCase()) ||
            entry.genre.toLowerCase().includes(searchvalue.toLowerCase()),
        )
      : data;
  return (
    <div className="w-full ">
      <div className="flex justify-between bg-white w-full p-4 items-center flex-wrap">
        <div className="flex sm:hidden py-4 bg-white ">
          <TiThMenu
            color="#3B82F6 "
            onClick={toggleDrawer(true)}
            size="30"
          />
        </div>
        <div>
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
              onChange={(e) => setSearchvalue(e.target.value)}
              className="w-full h-full outline-none placeholder-gray-500 text-gray-500 bg-transparent text-sm"
            />
          </div>
          <Drawer open={open} onClose={toggleDrawer(false)}>
                  <SideNav/>
                </Drawer>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          {userdet?.data?.profileImg ? (
            <Avatar
              alt={userdet?.data?.username || "user"}
              sx={{ width: 30, height: 30 }}
              src={userdet?.data?.profileImg || ""}
            />
          ) : (
            <Avatar sx={{ bgcolor: "gray" }}>
              {" "}
              {(userdet?.data?.username || "User").slice(0, 1)}
            </Avatar>
          )}
          Hi {userdet?.data?.username || "user"}{" "}
          <IoNotificationsCircleOutline size={20} />{" "}
        </div>
      </div>

      <div className="flex justify-between m-2">
        <Stack direction="row" spacing={1}>
          <Chip
            label="All"
            onClick={() => setSearchvalue("")}
            variant={searchvalue == "" ? "filled" : "outlined"}
          />
          <Chip
            label="General"
            variant={searchvalue == "general" ? "filled" : "outlined"}
            onClick={() => setSearchvalue("general")}
          />
          <Chip
            label="work"
            variant={searchvalue == "work" ? "filled" : "outlined"}
            onClick={() => setSearchvalue("work")}
          />
          <Chip
            label="school"
            variant={searchvalue == "school" ? "filled" : "outlined"}
            onClick={() => setSearchvalue("school")}
          />
        </Stack>

        <a href="/dashboard/newnote">
          <div className="flex text-gray-700">
            <IoAddCircleSharp size={24} />
            Add a new note{" "}
          </div>
        </a>
      </div>
      <div>
        {error ? (
          <div className="w-full flex justify-center items-center h-96">
            <Alert
              severity="error"
              sx={{ backgroundColor: "#3B82F6" }}
              variant="filled"
            >
              {error.message ||
                "something went wrong while fetching your notes"}
            </Alert>{" "}
          </div>
        ) : isLoading ? (
          <div className="w-full flex justify-center items-center h-96">
            <HashLoader
              color="#3B82F6
"
            />
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap px-2 h-[525px] overflow-y-auto">
            {filteredNotes && filteredNotes.length !== 0 ? (
              filteredNotes.map((entry: Entry, index: number) => {
                return (
                  <Card key={index} sx={{ width: "18rem", height: "12.5rem" }}>
                    <CardContent>
                      {entry.isPinned ? <MdPushPin /> : <TiPinOutline />}

                      <div className="flex justify-between">
                        <Typography
                          gutterBottom
                          sx={{ color: "text.secondary", fontSize: 14 }}
                        >
                          {entry.genre}
                        </Typography>
                        <Typography
                          gutterBottom
                          sx={{ color: "text.secondary", fontSize: 14 }}
                        >
                          {dayjs(entry.createdAt).format("DD MMMM YYYY")}
                        </Typography>{" "}
                      </div>
                      <Typography
                        variant="h5"
                        component="div"
                        color="primary"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {entry.title}
                      </Typography>

                      <Typography variant="body2">
                        {entry.synopsis.slice(0, 200)}...
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions className="flex  flex-col justify-center gap-2">
                      <Divider
                        orientation="horizontal"
                        sx={{
                          width: "20rem",
                          backgroundColor: "white",
                          height: "0.5px",
                        }}
                      />
                      <div className="flex  justify-between w-full">
                        <Button
                          size="small"
                          onClick={() =>
                            navigate(`/dashboard/notes/${entry.id}`)
                          }
                        >
                          Learn More
                        </Button>
                        <div className="flex gap-2 items-center">
                          {entry.isBookmarked ? (
                            <BsBookmarkStarFill
                              color="grey"
                              size={20}
                              onClick={() => removebookmark.mutate(entry.id)}
                            />
                          ) : (
                            <BsBookmarkStar
                              color="grey"
                              size={20}
                              onClick={() => addbookmark.mutate(entry.id)}
                            />
                          )}{" "}
                          <MdOutlineEditNote
                            size={25}
                            color="grey"
                            onClick={() =>
                              navigate(`/dashboard/notes/${entry.id}`)
                            }
                          />
                          <Popover open={isopen} onOpenChange={setIsOpen}>
                            <PopoverTrigger>
                              <RiChatDeleteLine size={25} color="#3B82F6" />
                            </PopoverTrigger>
                            <PopoverContent className="bg-white flex flex-col justify-center">
                              <div className="flex items-center justify-center ">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
                                    stroke="#DC2626"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <h1>Are you sure you want to delete?</h1>
                              <p>This action can not be undone</p>
                              <div className="w-full justify-center flex gap-3">
                                <Button
                                  variant="contained"
                                  onClick={() => setIsOpen(false)}
                                  sx={{ backgroundColor: "gray" }}
                                >
                                  Cancel
                                </Button>{" "}
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    mutate(entry.id);
                                    console.log(entry.id);
                                  }}
                                  loading={isPending}
                                >
                                  Yes
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>{" "}
                      </div>
                    </CardActions>
                  </Card>
                );
              })
            ) : (
              <div className="w-full flex justify-center items-center h-96">
                <Alert severity="info" variant="filled">
                  Your notes will show here
                </Alert>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;

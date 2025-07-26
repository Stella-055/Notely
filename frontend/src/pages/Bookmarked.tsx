import Avatar from "@mui/material/Avatar";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/axios";
import { HashLoader } from "react-spinners";
import { Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
const Bookmarked = () => {
   const [searchvalue, setSearchvalue] = useState("");
  type User = {
    username: string;
    profileImg: string;
  };
  type Entry = {
    id: string;
    userId: string;
    genre: string;
    title: string;
    synopsis: string;
    createdAt: string;
    user: User;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-bookmarked-entries"],
    queryFn: async () => {
      const response = await api.get("/entries/bookmark");
      console.log(response.data.entries);
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
  const filteredNotes =
  searchvalue.trim() !== ""
    ? data?.filter(
        (entry: Entry) =>
          entry.title.toLowerCase().includes(searchvalue.toLowerCase()) ||
          entry.synopsis.toLowerCase().includes(searchvalue.toLowerCase())||
          entry.genre.toLowerCase().includes(searchvalue.toLowerCase())
      )
    : data;
  return (
    <div className="flex flex-col  w-full">
      <div className="flex justify-between bg-white w-full p-4">
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
              onChange={(e)=>setSearchvalue(e.target.value)}
              placeholder="Find a Note"
              className="w-full h-full outline-none placeholder-gray-500 text-gray-500 bg-transparent text-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 w-32 h-8 rounded-full text-sm text-white"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
           {userdet.data?.profileImg ?<Avatar
                      alt={userdet.data?.username || "user"}
                      sx={{ width: 30, height: 30 }}
                      src={userdet.data?.profileImg || ""}
                    />:<Avatar sx={{ bgcolor: "gray" }}>{(userdet.data?.username).slice(0,1)||"User".slice(0,1)}</Avatar>}
          Hi {userdet.data?.username || "user"}{" "}
          <IoNotificationsCircleOutline size={20} />{" "}
        </div>
      </div>

      {error ? (
        <div className="w-full flex justify-center items-center h-96">
          <Alert
            severity="error"
            sx={{ backgroundColor: "#3B82F6" }}
            variant="filled"
          >
            {error.message ||
              "something went wrong while fetching deleted notes"}
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
        <div className="p-4 flex gap-3 flex-wrap">
          {filteredNotes &&filteredNotes.length !== 0 ?  (
            filteredNotes.map((entry: Entry, index: number) => {
              return (
                <Card key={index} sx={{ width: "18rem" }}>
                  <CardContent>
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
                    <div className="flex items-center gap-2 text-gray-700">
                      <Avatar
                        alt={entry.user?.username || "user"}
                        sx={{ width: 30, height: 30 }}
                        src={entry.user?.profileImg || ""}
                      />
                      Author: {entry.user?.username || "user"}{" "}
                    </div>
                    <Button
                      size="small"
                      onClick={() => mutate(entry.id)}
                      loading={isPending}
                    >
                      unfavorite
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center h-96">
              <Alert severity="info" variant="filled">
                Your favorite Notes will show here
              </Alert>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarked;

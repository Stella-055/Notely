
import { useQuery,useMutation } from "@tanstack/react-query";
import api from "@/Api/axios";
import {Avatar }from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import {Alert} from "@mui/material";
import { HashLoader } from "react-spinners";
import dayjs from "dayjs";
import { BsBookmarkStar } from "react-icons/bs";
import {Divider} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
const Cal = () => {
  const navigate=useNavigate()
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
    content: string;
    isPublished: boolean;
    createdAt: string;
    isBookmarked: boolean;
    isPinned: boolean;
    user:User
  };
  const { data,error,isLoading } = useQuery({
    queryKey: ["get-published-entries"],
    queryFn: async () => {
      const response = await api.get("/entries/published");
     
      return response.data.entries;
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
  return (
    <div className="flex w-full flex-wrap justify-around mt-4">
      <div>
 
        <div>
          <div className="flex flex-wrap gap-2 justify-center items-center">
{error ? (
          <div className="w-full flex justify-center items-center ">
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
          <div className="w-full flex justify-center items-center ">
            <HashLoader
              color="#3B82F6
"
            />
          </div>
        ) : (data.slice(0,3).map((entry:Entry,index:number)=>{ return <Card key={index} sx={{ width: "18rem" }}>
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
          <div className="flex items-center gap-2 text-gray-700">
                      <Avatar
                        alt={entry.user?.username || "user"}
                        sx={{ width: 30, height: 30 }}
                        src={entry.user?.profileImg || ""}
                      />
                      Author: {entry.user?.username || "user"}
                    </div>
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
           
                <BsBookmarkStar
                  color="grey"
                  size={20}
                  onClick={() => addbookmark.mutate(entry.id)}
                />
           
              
              
            </div>{" "}
          </div>
        </CardActions>
      </Card>}))}

         
          </div>
        </div>
        <Stack spacing={2} className="mt-3">
     
      <Pagination count={data?data.length /2:2} variant="outlined" color="primary" />
      
    </Stack>
      </div>
   
    </div>
  )
}

export default Cal

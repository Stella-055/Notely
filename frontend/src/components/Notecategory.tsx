import { MdOutlinePlayArrow } from "react-icons/md";
import { ImMenu4 } from "react-icons/im";
import { HashLoader } from "react-spinners";
import { Alert } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaArrowCircleDown } from "react-icons/fa";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const Notecategory = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-enteries"],
    queryFn: async () => {
      const response = await api.get("/entries");
      return response.data.entries;
    },
  });
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
  return (
    <div className="flex flex-col h-screen  w-80 p-6 gap-2 border-r-1">
      <div className="flex justify-between">
        <h1 className="font-semibold ">ALL</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaArrowCircleDown size={20} color="#3B82F6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>General</DropdownMenuItem>
            <DropdownMenuItem>Work</DropdownMenuItem>
            <DropdownMenuItem>School</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </div>

      <div className="flex justify-between">
        <p className="text-gray-500 " style={{ fontSize: ".9rem" }}>
          {data ? data.length : 0}notes
        </p>
        <div className="flex gap-1">
          <MdOutlinePlayArrow color="grey" />
          <ImMenu4 color="grey" />
        </div>
      </div>
      <div className="flex items-center gap-3 max-w-md w-full">
        <div className="flex items-center w-full border pl-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-md overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Search for a Note"
            className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
          />
        </div>
      </div>
      <Button variant="contained" href="/dashboard/newnote">
        Add a Note
      </Button>

      <div className="scroll-auto">
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
          data.slice(0, 5).map((entry: Entry, index: number) => {
            return (
              <div
                key={index}
                className="shadow-gray-400 shadow p-2 "
                onClick={() => navigate(`/dashboard/notes/${entry.id}`)}
              >
                <div className="flex justify-between ">
                  {" "}
                  <h1 className="text-gray-500">{entry.genre}</h1>{" "}
                  <h1 className="text-gray-500">
                    {" "}
                    {dayjs(entry.createdAt).format("DD MMMM YYYY")}
                  </h1>{" "}
                </div>
                <h1 className="font-bold">{entry.title}</h1>
                <p className="text-gray-500">
                  {entry.synopsis.slice(0, 200)}...
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notecategory;

import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { IoAddCircleSharp } from "react-icons/io5";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";
import { MdOutlineEditNote } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { TiPinOutline } from "react-icons/ti";
import { BsBookmarkStarFill } from "react-icons/bs";
import { BsBookmarkStar } from "react-icons/bs";
function Overview() {
  return (
    <div className="w-full ">
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
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 30, height: 30 }}
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
          />
          Hi Frank <IoNotificationsCircleOutline size={20} />{" "}
        </div>
      </div>

      <div className="flex justify-between m-2">
        <Stack direction="row" spacing={1}>
          <Chip label="All" />
          <Chip label="General" variant="outlined" />
          <Chip label="work" variant="outlined" />
          <Chip label="school" variant="outlined" />
        </Stack>
        <div className="flex text-gray-700">
          <a href="/dashboard/newnote">
            <IoAddCircleSharp size={24} />
            Add a new note{" "}
          </a>
        </div>
      </div>
      <div>
        <Card sx={{ width: "18rem" }}>
          <CardContent>
            <TiPinOutline />
            <div className="flex justify-between">
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                General
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                July 7th 2025
              </Typography>{" "}
            </div>
            <Typography variant="h5" component="div" color="primary">
              Physics
            </Typography>

            <Typography variant="body2">
              Lorem ipsum dolor sit amet consecteolestias repellendus culpa nam
              praesentium assumenda ea vel cum quam.
              <br />
            </Typography>
          </CardContent>
          <CardActions className="flex  flex-col justify-center gap-2">
            <Divider
              orientation="horizontal"
              sx={{ width: "20rem", backgroundColor: "white", height: "0.5px" }}
            />
            <div className="flex  justify-between w-full">
              <Button size="small">Learn More</Button>
              <div className="flex gap-2 items-center">
                {" "}
                <BsBookmarkStar color="grey" size={20} />{" "}
                <MdOutlineEditNote size={25} color="grey" />
                <RiChatDeleteLine size={25} color="#3B82F6" />
              </div>{" "}
            </div>
          </CardActions>
        </Card>{" "}
      </div>
    </div>
  );
}

export default Overview;

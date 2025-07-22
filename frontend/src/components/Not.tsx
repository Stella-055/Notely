import Chip from "@mui/material/Chip";
import { FaBold } from "react-icons/fa";
import { LiaItalicSolid } from "react-icons/lia";
import { FaUnderline } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphRight } from "react-icons/im";
import { MdOutlineEditNote } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "@/Api/axios";
import { HashLoader } from "react-spinners";
import useUser from "@/stores/userStore";
import { Alert } from "@mui/material";

const Not = () => {
  const { entry } = useUser();
  const { id } = useParams();
  const entryid = entry || id;
  const info = !entryid ? "Note will show here" : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-entery", entryid],
    queryFn: async () => {
      const response = await api.get(`/entry/${entryid}`);
      return response.data.entry;
    },
    enabled: !!entryid,
  });

  return (
    <div className="scroll-auto flex flex-col h-screen w-full p-5">
      <div className="flex justify-between mb-6">
        <Chip label={data ? data.genre : "Genre"} />
        <div className="flex gap-2">
          <FaBold /> <LiaItalicSolid />
          <FaUnderline /> <ImParagraphCenter /> <ImParagraphLeft />
          <ImParagraphRight />
        </div>
        <div className="flex gap-2">
          <MdOutlineEditNote size={25} color="#3B82F6" />
          <RiChatDeleteLine size={25} color="#3B82F6" />
        </div>
      </div>
      {info ? (
        <div className="w-full flex justify-center items-center h-96">
          <Alert
            severity="error"
            sx={{ backgroundColor: "#3B82F6" }}
            variant="filled"
          >
            {info}
          </Alert>{" "}
        </div>
      ) : isLoading ? (
        <div className="w-full flex justify-center items-center h-96">
          <HashLoader color="#3B82F6" />
        </div>
      ) : error ? (
        <div className="w-full flex justify-center items-center h-96">
          <Alert
            severity="error"
            sx={{ backgroundColor: "#3B82F6" }}
            variant="filled"
          >
            {error.message || "Note will show here"}
          </Alert>
        </div>
      ) : (
        <div className="flex flex-col">
          <input
            type="text"
            disabled
            value={data.title}
            className="mb-5 text-3xl font-semibold capitalize"
          />
          <label htmlFor="synopsis" className="text-gray-500">
            Synopsis:
          </label>
          <textarea disabled className="text-gray-500 mb-5 h-20 capitalize" id="synopsis">
            {data.synopsis}
          </textarea>
          <label htmlFor="content" className="text-gray-500">
            Content:
          </label>
          <textarea name="" id="content" className="h-96 text-gray-500" disabled>
            {data.content}
          </textarea>
        </div>
      )}
    </div>
  );
};

export default Not;

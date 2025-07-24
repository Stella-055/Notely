import Chip from "@mui/material/Chip";
import { FaBold } from "react-icons/fa";
import { LiaItalicSolid } from "react-icons/lia";
import { FaUnderline } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphRight } from "react-icons/im";
import { MdOutlineEditNote } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "@/Api/axios";
import Switch from "@mui/material/Switch";
import { HashLoader } from "react-spinners";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const Not = () => {
  type Note = {
    genre: string;
    title: string;
    synopsis: string;
    content: string;
    isPublished: boolean;
  };
  const { id } = useParams();

  const entryid = id;
  const info = !entryid ? "Note will show here" : null;
  const [disableEditting, setDisableEditting] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-entery", entryid],
    queryFn: async () => {
      const response = await api.get(`/entry/${entryid}`);
      return response.data.entry;
    },
    enabled: !!entryid,
  });
  const [notedetails, setNotedetails] = useState<Note>({
    genre: data ? data.genre : "",
    title: data ? data.title : "",
    isPublished: data ? data.isPublished : false,
    content: data ? data.content : "",
    synopsis: data ? data.synopsis : "",
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: async (note: Note) => {
      const response = await api.patch(`/entry/${entryid}`, note);

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
      setDisableEditting(true);
      toast.success("Updated note  successfully", {
        position: "top-center",
      });
    },
  });
  function updatenote() {
    mutate(notedetails);
  }
  return (
    <div className="scroll-auto flex flex-col h-screen w-full p-5">
      <div className="flex justify-between mb-6">
        <Chip label={data ? data.genre : "Genre"} />

        <div className="flex gap-2">
          <FaBold /> <LiaItalicSolid />
          <FaUnderline /> <ImParagraphCenter /> <ImParagraphLeft />
          <ImParagraphRight />
        </div>

        {data.u}
        <div className="flex gap-2">
          <MdOutlineEditNote
            size={25}
            color="#3B82F6"
            onClick={() => {
              setDisableEditting(false);
              toast.info("edditting Enabled");
            }}
          />
          <Chip label="Delete Note" variant="outlined" />
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
          <div className="mb-2">
            {data && data.isPublished ? (
              <div className="flex items-center">
                <MdPublishedWithChanges /> <h1>Published</h1>{" "}
                <Switch
                  defaultChecked={true}
                  disabled={disableEditting}
                  onChange={() =>
                    setNotedetails({
                      ...notedetails,
                      isPublished: !notedetails.isPublished,
                    })
                  }
                  aria-label=" switch"
                />
              </div>
            ) : (
              <div className="flex items-center">
                <MdUnpublished /> <h1>UnPublished</h1>{" "}
                <Switch
                  defaultChecked={false}
                  disabled={disableEditting}
                  onChange={() =>
                    setNotedetails({
                      ...notedetails,
                      isPublished: !notedetails.isPublished,
                    })
                  }
                  aria-label="login switch"
                />{" "}
              </div>
            )}{" "}
          </div>
          <input
            type="text"
            disabled={disableEditting}
            onChange={(e) =>
              setNotedetails({ ...notedetails, title: e.target.value })
            }
            value={data.title}
            className="mb-5 text-3xl font-semibold capitalize"
          />
          <label htmlFor="synopsis" className="text-gray-500">
            Synopsis:
          </label>
          <textarea
            disabled={disableEditting}
            className="text-gray-500 mb-5 p-2 h-20 capitalize"
            id="synopsis"
            onChange={(e) =>
              setNotedetails({ ...notedetails, synopsis: e.target.value })
            }
          >
            {data.synopsis}
          </textarea>
          <label htmlFor="content" className="text-gray-500">
            Content:
          </label>
          <textarea
            name=""
            id="content"
            className="h-64 text-gray-500 p-2"
            disabled={disableEditting}
            onChange={(e) =>
              setNotedetails({ ...notedetails, content: e.target.value })
            }
          >
            {data.content}
          </textarea>
          {!disableEditting && (
            <div className="gap-2 mt-2 w-full flex justify-center ">
              {" "}
              <Button
                onClick={updatenote}
                variant="contained"
                loading={isPending}
              >
                Update
              </Button>{" "}
              <Button variant="outlined">Generate Content</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Not;

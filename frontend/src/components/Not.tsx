import Chip from "@mui/material/Chip";
import { FaBold } from "react-icons/fa";
import { LiaItalicSolid } from "react-icons/lia";
import { FaUnderline } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphRight } from "react-icons/im";
import { MdOutlineEditNote } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import he from "he";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "@/Api/axios";
import Switch from "@mui/material/Switch";
import { HashLoader } from "react-spinners";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useState ,useEffect} from "react";
import { toast } from "sonner";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Vapi from '@vapi-ai/web';
import { useRef } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Not = () => {
  
  type Note = {
    genre: string;
    title: string;
    synopsis: string;
    content: string;
    isPublished: boolean;
  };
  const { id } = useParams();

  const [isopen, setIsOpen] = useState(false);
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
    console.log(notedetails);
    mutate(notedetails);
  }
  const deleteNote = useMutation({
    mutationKey: ["delete:note"],
    mutationFn: async () => {
      const response = await api.delete(`/entry/${id}`);

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
  const [notedetails, setNotedetails] = useState<Note>({
    genre: data ? data.genre : "",
    title: data ? data.title : "",
    isPublished: data ? data.isPublished : false,
    content: data ? data.content : "",
    synopsis: data ? data.synopsis : "",
  });
  useEffect(() => {
    if (data) {
      setNotedetails({
        genre: data.genre || "",
        title: data.title || "",
        isPublished: data.isPublished || false,
        content: data.content || "",
        synopsis: data.synopsis || "",
      });
    }
  }, [data]);

  const [isConnected, setIsConnected] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
const vapiRef = useRef<Vapi | null>(null);
useEffect(() => {
  
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY!);
    
    const vapi = vapiRef.current;

    vapi.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapi.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapi.on("message", (message) => {
      if (message.role === "assistant" && message.type === "conversation-update") {
        console.log("Assistant says:", message.content);
      }
    });
  }

  return () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };
}, []);




const ensureMicAccess = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (err) {
    toast.error("Microphone access is required to use voice assistant.");
    return false;
  }
};


const handleReadNote = async () => {
  if (!notedetails.content) {
    toast.error("Note content is empty. Please add content to the note.");
    return;
  }

  if (!import.meta.env.VITE_VAPI_ASSISTANT_ID) {
    toast.error("Assistant ID is not configured.");
    return;
  }

  const hasMicAccess = await ensureMicAccess();
  if (!hasMicAccess) return;

  try {
    if (vapiRef.current) {
    
      await vapiRef.current.start(import.meta.env.VITE_VAPI_ASSISTANT_ID!);
      const sendResult = await vapiRef.current.send({
        type: "say",
        message: notedetails.content
      });
      console.log("Message sent:", sendResult);
       
     }
  } catch (error) {
    console.error("Error starting voice assistant:", error);
    toast.error("Failed to start the voice assistant.");
  }
};
const handleStopReading = () => {
  if (vapiRef.current) {
    vapiRef.current.stop();
  }
};


  return (
    <div className=" flex flex-col h-screen w-full p-5 overflow-x-hidden">
      <div className="flex justify-between mb-6 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Chip label={notedetails.genre || "Genre"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setNotedetails({ ...notedetails, genre: "General" });
              }}
            >
              General
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setNotedetails({ ...notedetails, genre: "Work" });
              }}
            >
              Work
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setNotedetails({ ...notedetails, genre: "School" });
              }}
            >
              School
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
        <div className="flex gap-2">
          <FaBold /> <LiaItalicSolid />
          <FaUnderline /> <ImParagraphCenter /> <ImParagraphLeft />
          <ImParagraphRight />
        </div>
        {id && (
          <div className="flex gap-2">
            <MdOutlineEditNote
              size={25}
              color="#3B82F6"
              onClick={() => {
                setDisableEditting(false);
                toast.info("edditting Enabled");
              }}
            />
            <Popover open={isopen} onOpenChange={setIsOpen}>
              <PopoverTrigger>
                <Chip label="Delete Note" variant="outlined" />
              </PopoverTrigger>
              <PopoverContent className="bg-white">
                {" "}
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
                    onClick={() => deleteNote.mutate()}
                    loading={isPending}
                  >
                    Yes
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
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
            value={notedetails.title}
            className="mb-5 text-3xl font-semibold capitalize"
          />
          <label htmlFor="synopsis" className="text-gray-500">
            Synopsis:
          </label>
          <textarea
            disabled={disableEditting}
            className="text-gray-500 mb-2 p-2 h-20 capitalize"
            value={notedetails.synopsis}
            id="synopsis"
            onChange={(e) =>
              setNotedetails({ ...notedetails, synopsis: e.target.value })
            }
          />
         <div className="flex gap-2">
          <label htmlFor="content" className="text-gray-500">
            Content:
          </label>  

          {!isConnected ? (
    <Chip label="🔊 Read Note" variant="filled" onClick={handleReadNote} />
  ) : (
    <div className="flex items-center gap-3">
      <span style={{ fontWeight: 'bold', color: '#333' }}>
        {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
      </span>
      <button
        onClick={handleStopReading}
        style={{
          background: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        ⏹ Stop
      </button>
    </div>
  )}
           </div>
          {disableEditting ? (
            <div className="h-72   p-2 overflow-y-auto sm:w-[50rem]   border rounded text-gray-700">
           
                <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-3xl font-bold mb-4" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-2xl font-semibold mt-6 mb-2" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-base text-gray-700 mb-4" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6 mb-4" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                  a: ({ ...props }) => (
                    <a
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  code: ({ ...props }) => (
                    <code className="bg-gray-100 px-1 rounded" {...props} />
                  ),
                }}
                >
                    {he.decode(notedetails.content)}
             
                </ReactMarkdown>{" "}
              
            </div>
          ) : (
            <textarea
              id="content"
              className="h-64 text-gray-500 p-2"
              value={ notedetails.content}
              onChange={(e) =>
                setNotedetails({ ...notedetails, content: e.target.value })
              }
            />
          )}
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
              <Button variant="outlined">Summarize Content</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Not;

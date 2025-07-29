import Usernav from "@/components/Usernav";
import { RiCameraAiLine } from "react-icons/ri";
import Chip from "@mui/material/Chip";
import { Avatar, Button } from "@mui/material";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/Api/axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
const Profile = () => {
  const { data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: async () => {
      const response = await api.get("/user");
      console.log(response.data);
      return response.data;
    },
  });

  type userDetails = {
    firstname: string;
    lastname: string;
    username: string;
    useremail: string;
    profileImg: string;
    bio: string;
  };
  const [image, setImage] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const [userdetails, setUserDetails] = useState<userDetails>({
    firstname: "-",
    lastname: "-",
    username: "-",
    useremail: "-",
    bio: "",
    profileImg: "",
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["update-primary-info"],
    mutationFn: async (data: userDetails) => {
      const response = await api.patch("/user", data);
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
      toast.success("Updated Details successfully", {
        position: "top-center",
      });
    },
  });
  type profileimageDetails = {
    profileImg: string;
  };
  const uploadImg = useMutation({
    mutationKey: ["update-primary-info"],
    mutationFn: async (data: profileimageDetails) => {
      const response = await api.patch("/user/profileimage", data);
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
      toast.success("Updated profile image successfully", {
        position: "top-center",
      });
    },
  });
  useEffect(() => {
    if (data) {
      setUserDetails({
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        username: data.user.username,
        useremail: data.user.useremail,
        profileImg: data.user.profileImg || "",
        bio: data.user.bio,
      });
    }
  }, [data]);
  async function imageupload() {
    if (!image) {
      toast.error("No image selected");
      return;
    }
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    try {
      setLoading(true);
      const response = await axios.post(uploadUrl, formData);
      setLoading(false);
      console.log(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.message, {
          position: "top-center",
        });
        return;
      } else {
        toast("something went wrong during image upload", {
          position: "top-center",
        });
        return;
      }
    }
  }
  function updateUserDetails() {
    mutate(userdetails);
  }

  async function updateProfile() {
    if (!image) {
      toast.error("No image selected", {
        position: "top-center",
      });
      return;
    }
    const uploadedUrl = await imageupload();
    if (!uploadedUrl) {
      toast.error("Error uploading Image", {
        position: "top-center",
      });
    }
    uploadImg.mutate({ profileImg: uploadedUrl });
  }
  return (
    <div className="w-full">
      <Usernav />

      <div className="p-5">
        <h1 className="font-bold text-2xl text-gray-700">
          Account Information
        </h1>
        <div className=" px-10 w-5/6">
          <div className="my-6 w-28 relative">
            <Avatar
              alt={data ? data.username : "user"}
              src={userdetails.profileImg}
              sx={{ width: 120, height: 120, fontSize: "4rem" }}
            />
            <div className="absolute top-20">
              <Popover>
                <PopoverTrigger>
                  <RiCameraAiLine size={30} color="gray" />
                </PopoverTrigger>
                <PopoverContent className=" w-96 px-3 bg-white rounded-lg border border-gray-500/30 shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">
                  <div className="flex items-center justify-center w-11 h-11 bg-gray-500/10 rounded-full">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.124 11.083h4.75m5.541 3.959a1.584 1.584 0 0 1-1.583 1.583H3.165a1.583 1.583 0 0 1-1.583-1.583V3.958a1.583 1.583 0 0 1 1.583-1.583h3.959L8.707 4.75h7.125a1.583 1.583 0 0 1 1.583 1.583z"
                        stroke="#2563EB"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl text-gray-800 font-medium mt-3">
                    Upload a Picture
                  </h2>
                  <p className="text-gray-500/80 mt-1">Attach the file below</p>
                  <label
                    htmlFor="fileInput"
                    className="border-2 border-dotted border-gray-400  mt-6 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition"
                  >
                    <input
                      id="fileInput"
                      type="file"
                    
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];

                        if (file) setImage(file);
                      }}
                    />
                  </label>

                  <div className="mt-2 flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-9 py-2 border border-gray-500/50 bg-white hover:bg-blue-100/30 active:scale-95 transition-all text-gray-500 rounded"
                    >
                      Cancel
                    </button>
                    <Button
                      type="button"
                      loading={loading}
                      onClick={updateProfile}
                      className="px-6 py-2 bg-blue-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded"
                    >
                      Upload Picture
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Chip label="Free Tier" />
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              {" "}
              <label htmlFor="firstname" className="text-gray-500">
                First Name
              </label>
              <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
                <input
                  id="firstname"
                  className="px-2 w-full h-full outline-none text-gray-500 bg-transparent"
                  type="text"
                  onChange={(e) =>
                    setUserDetails({
                      ...userdetails,
                      firstname: e.target.value,
                    })
                  }
                  value={userdetails.firstname}
                />
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>{" "}
            </div>
            <div>
              {" "}
              <label htmlFor="lastname" className="text-gray-500">
                Last Name
              </label>
              <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
                <input
                  id="lastname"
                  onChange={(e) =>
                    setUserDetails({ ...userdetails, lastname: e.target.value })
                  }
                  className="px-2 w-full h-full outline-none text-gray-500 bg-transparent"
                  type="email"
                  value={userdetails.lastname}
                  placeholder="Enter your name"
                />
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>{" "}
            </div>
            <div>
              {" "}
              <label htmlFor="firstname" className="text-gray-500">
                User Name
              </label>
              <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
                <input
                  id="username"
                  className="px-2 w-full h-full outline-none text-gray-500 bg-transparent"
                  type="text"
                  onChange={(e) =>
                    setUserDetails({ ...userdetails, username: e.target.value })
                  }
                  value={userdetails.username}
                />
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>{" "}
            </div>
            <div>
              {" "}
              <label htmlFor="useremail" className="text-gray-500">
                Email
              </label>
              <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
                <input
                  id="useremail    "
                  className="px-2 w-full h-full outline-none text-gray-500 bg-transparent"
                  type="text"
                  onChange={(e) =>
                    setUserDetails({
                      ...userdetails,
                      useremail: e.target.value,
                    })
                  }
                  value={userdetails.useremail}
                />
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>{" "}
            </div>

            <div className="flex flex-col">
              <label htmlFor="bio" className="text-gray-500">
                Your Bio
              </label>
              <textarea
                className="w-80 border  border-gray-300 bg-gray-50 p-2 text-gray-500 "
                name=""
                onChange={(e) =>
                  setUserDetails({ ...userdetails, bio: e.target.value })
                }
                id="bio"
                value={userdetails.bio}
              ></textarea>
            </div>
            <Button
              variant="contained"
              loading={isPending}
              onClick={updateUserDetails}
              sx={{ height: "2rem ", marginTop: "2rem", width: "20rem" }}
            >
              UPDATE
            </Button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Profile;

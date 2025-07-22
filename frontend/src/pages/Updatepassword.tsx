import Usernav from "@/components/Usernav";
import { Alert, Button } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/Api/axios";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
const Updatepassword = () => {
  type passwordDetails = {
    oldpassword: string;
    newpassword: string;
  };
  const [passwords, setPasswords] = useState<passwordDetails>({
    oldpassword: "",
    newpassword: "",
  });
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errors, setErrors] = useState<null | string>(null);
  const { isPending, mutate } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data: passwordDetails) => {
      const response = await api.post("/auth/password", data);
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
      toast.success("password updated successfully", {
        position: "top-center",
      });
      setConfirmpassword("");
      setPasswords({ oldpassword: "", newpassword: "" });
    },
  });

  function handleupdatePassword() {
    setErrors(null);
    if (confirmpassword !== passwords.newpassword) {
    return  setErrors("password and confirm password do not match");
    }
    mutate(passwords);
  }
  return (
    <div className="w-full flex flex-col">
      <Usernav />
      <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto text-blue-500">
          Update Your Password
        </p>
        {errors && (
          <Alert severity="error" variant="filled">
            {errors}
          </Alert>
        )}
        <div className="w-full">
          <p>Previous password</p>
          <input
            type="password"
            onChange={(e) =>
              setPasswords({ ...passwords, oldpassword: e.target.value })
            }
            value={passwords.oldpassword}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500"
            required
          />
        </div>

        <div className="w-full ">
          <p>New password</p>
          <input
            type="password"
            onChange={(e) =>
              setPasswords({ ...passwords, newpassword: e.target.value })
            }
            value={passwords.newpassword}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            required
          />
        </div>
        <div className="w-full ">
          <p> Confirm Password</p>
          <input
            type="password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            value={confirmpassword}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            required
          />
        </div>
        <Button
          variant="contained"
          loading={isPending}
          onClick={handleupdatePassword}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default Updatepassword;

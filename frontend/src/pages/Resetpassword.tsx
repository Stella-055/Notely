import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button } from "@mui/material";

import api from "@/Api/axios";
import { useMutation } from "@tanstack/react-query";
const Resetpassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("tempToken");
  useEffect(() => {
    if (!token) {
      navigate("/forgotpassword");
    }
  }, []);
  type details = {
    tempToken: string;
    newPassword: string;
  };
  const [errors, setErrors] = useState<null | string>();
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (detail: details) => {
      const response = await api.post("/auth/update-password", detail);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data.message);

        return;
      } else {
        setErrors("something went wrong");

        return;
      }
    },
    onSuccess: () => {
      localStorage.removeItem("otpEmail");
      localStorage.removeItem("tempToken");

      navigate("/signin");
    },
  });
  function handlesubmit() {
    console.log(token);
    setErrors(null);
    if (confirmpassword !== newpassword) {
      setErrors("password and confirmpassword dont match");
      return;
    }

    mutate({
      tempToken: token!,
      newPassword: newpassword,
    });
  }
  return (
    <div className="w-full pt-32 flex justify-center items-center ">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Update Password
        </h2>
        {errors && <Alert severity="error">{errors}</Alert>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={newpassword}
          onChange={(e) => setNewpassword(e.target.value)}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
        />
        <label htmlFor="confirmpassword"> Confirm Password</label>
        <input
          id="confirmpassword"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
        />
        <Button
          variant="contained"
          loading={isPending}
          fullWidth
          onClick={handlesubmit}
        >
          Update password
        </Button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-500 underline">Signup Now</span>
        </p>
      </div>
    </div>
  );
};

export default Resetpassword;

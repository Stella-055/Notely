import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import api from "@/Api/axios";
import { useMutation } from "@tanstack/react-query";
export function OTP() {
  const navigate = useNavigate();
  type userotp = {
    otp: number|string
    useremail:string
  };
  const email = localStorage.getItem("otpEmail");
  const [value, setValue] = useState<userotp>({ otp: "" ,useremail:email||""});
  const [errors, setErrors] = useState<null | string>();
  const{mutate,isPending}=useMutation({
    mutationKey:["register"],
    mutationFn: async(user:userotp)=>{
        const response= await api.post("/auth/verifyotp",user)
        return response.data
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
      onSuccess: (data) => {
        localStorage.setItem("tempToken", data.tempToken);
navigate("/resetpassword");
       
      },
  })
  function handlesubmit(){
    setErrors(null);
    mutate(value);
  }
  return (
    <div className="w-full pt-32 flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center border p-6">
        <h2 className="text-lg">One-Time Password</h2>
        {errors && <Alert severity="error" variant="filled">{errors}</Alert>}
        <InputOTP maxLength={6} value={String(value.otp)}
            onChange={(otp) => setValue({ ...value ,otp:Number(otp) })}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <h2 className="text-base">
          {" "}
          Please enter the one-time password sent to your email.{" "}
        </h2>
        <Button variant="contained" loading={isPending} onClick={handlesubmit}> Submit</Button>
      </div>
    </div>
  );
}

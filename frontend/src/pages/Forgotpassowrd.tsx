import { Button } from "@mui/material";
import {  useState } from "react";
import { useMutation } from '@tanstack/react-query';
import {Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "@/Api/axios";
import axios from "axios";

const Forgotpassowrd = () => {
  type userdetails = {
    useremail: string;
  };
  const navigate=useNavigate()
  const[user ,setUser]=useState<userdetails>({useremail:""})
  const [formerror,setFormerror]=useState<null|string>()
  const{mutate,isPending}=useMutation({
    mutationKey:["forgot-password"],
    mutationFn:async (user:userdetails)=>{
const response=await api.post("/auth/forgotpassword",user)
return response.data
    },
    onError:(error)=>{
if(axios.isAxiosError(error)){
  setFormerror(error.response?.data.message)
  return
}else {
  setFormerror("something went wrong");
  return;
}

    },
    onSuccess:()=>{
      localStorage.setItem("otpEmail", user.useremail);

     navigate("/otp")
    }
  })
  return (
    <div className="w-full flex justify-center items-center pt-32">
      <div className="bg-gray-50 text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10 border ">
     <div className="flex justify-center items-center w-full flex-col"><img src="/notelylogo.png" alt="logo" className="w-14" />
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Forget Password?
        </h2></div> 
        {formerror && 
          <Alert severity="error"variant="filled" className="mb-4">
            {formerror}
          </Alert>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={user.useremail}
          onChange={(e)=>setUser({...user,useremail:e.target.value})}
          className="w-full border mt-1 mb-3 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
        />
        <Button variant="contained" loading={isPending} fullWidth onClick={()=>{setFormerror(null);mutate(user)}}>
       
          Send Email
        </Button>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-500 underline">
            {" "}
            <a href="/register">Signup Now </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Forgotpassowrd;

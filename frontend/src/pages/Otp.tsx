import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp";
  import { Button } from "@mui/material";



export function OTP() {
  

  return (
    <div className="w-full pt-32 flex justify-center items-center ">
   <div className="flex flex-col justify-center items-center border p-6">
     <h2 className="text-lg">One-Time Password</h2>
          <InputOTP
            maxLength={6}
          
           
          >
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
          <Button  variant="contained">
            {" "}
            Submit
          </Button>
   </div> </div>
  )
}

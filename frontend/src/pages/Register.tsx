import { Button } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "@/Api/axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
 
  type userdetails = {
    firstname: string;
    lastname: string;
    username: string;
    useremail: string;
    password: string;
  };
  const [user, setUser] = useState<userdetails>({
    firstname: "",
    lastname: "",
    username: "",
    useremail: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formerror, setFormError] = useState<null | string>();
  const [visibility, setVisibility] = useState(false);
  const [visibility1, setVisibility1] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (newuser: userdetails) => {
      const response = await api.post("/auth/register", newuser);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
        return;
      } else {
        setFormError("something went wrong");
        return;
      }
    },
    onSuccess: () => {
      navigate("/signin");
    },
  });
  function registerUser() {
    if (user.password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    setFormError(null);
    mutate(user);
  }
  return (
    <div className="w-full flex flex-col items-center justify-center pt-24">
      <form className="md:w-96 w-80 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-gray-900 font-medium flex">
          {" "}
          <img src="/notelylogo.png" alt="logo" className="w-12" />
          Register
        </h2>
        <p className="text-sm text-gray-500/90 mt-3">
          Welcome to Notely! Please sign up to continue
        </p>

        <button
          type="button"
          onClick={() => window.location.href = "http://localhost:3000/auth/google"}
        
          className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
        >
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
            alt="googleLogo"
          />
        </button>

        <div className="flex items-center gap-4 w-full my-5">
          <div className="w-full h-px bg-gray-300/90"></div>
          <p className="w-full text-nowrap text-sm text-gray-500/90">
            or sign up{" "}
          </p>
          <div className="w-full h-px bg-gray-300/90"></div>
        </div>
        {formerror && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ position: "fixed", top: "5rem", marginBottom: "1rem" }}
          >
            {formerror}
          </Alert>
        )}
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2  ">
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
          <input
            type="text"
            placeholder="First Name"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-4">
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
          <input
            type="text"
            placeholder="Last Name"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-4">
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
          <input
            type="text"
            placeholder="User Name"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-4">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            placeholder="Email id"
            onChange={(e) => setUser({ ...user, useremail: e.target.value })}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type={visibility ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
          <div className="mr-3">
            {" "}
            {visibility ? (
              <EyeOff size={17} onClick={() => setVisibility(!visibility)} />
            ) : (
              <Eye size={17} onClick={() => setVisibility(!visibility)} />
            )}
          </div>
        </div>
        <div className="flex items-center mt-4 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type={visibility1 ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=" confirm Password"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
          <div className="mr-3">
            {" "}
            {visibility1 ? (
              <EyeOff size={17} onClick={() => setVisibility1(!visibility1)} />
            ) : (
              <Eye size={17} onClick={() => setVisibility1(!visibility1)} />
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-8 mb-8 text-gray-500/80">
          <div className="flex items-center gap-2">
            <input className="h-5" type="checkbox" id="checkbox" />
            <label className="text-sm" htmlFor="checkbox">
              Remember me
            </label>
          </div>
          <a className="text-sm underline" href="/forgotpassword">
            Forgot password?
          </a>
        </div>

        <Button
          variant="contained"
          fullWidth
          loading={isPending}
          onClick={registerUser}
        >
          Create Account
        </Button>
        <p className="text-gray-500/90 text-sm mt-4">
          {" "}
          Have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/signin">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;

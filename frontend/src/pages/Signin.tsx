import { Button } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/Api/axios";
import useUser from "@/stores/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
const Signin = () => {
  const { setUserName } = useUser();
  const navigate = useNavigate();
  type userdetails = {
    usercredential: string;
    password: string;
  };

  const [user, setUser] = useState<userdetails>({
    usercredential: "",
    password: "",
  });
  const [formError, setFormError] = useState<null | string>();
  const { mutate, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (user: userdetails) => {
      const result = await api.post("/auth/login", user);
      return result.data;
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
    onSuccess: (data) => {
      setFormError(null);
      setUserName({ username: data.username });
      navigate("/dashboard");
    },
  });
  function signinuser() {
    setFormError(null);
    mutate(user);
  }
  return (
    <div className="w-full flex flex-col items-center justify-center pt-24">
      <form className="md:w-96 w-80 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
        <p className="text-sm text-gray-500/90 mt-3">
          Welcome back! Please sign in to continue
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
            or sign in with email
          </p>
          <div className="w-full h-px bg-gray-300/90"></div>
        </div>
        {formError && (
          <Alert
            severity="error"
            sx={{ width: "100%", marginBottom: "1rem" }}
            variant="filled"
          >
            {formError}
          </Alert>
        )}
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
            value={user.usercredential}
            onChange={(e) =>
              setUser({ ...user, usercredential: e.target.value })
            }
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
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
          onClick={signinuser}
          loading={isPending}
        >
          Login
        </Button>
        <p className="text-gray-500/90 text-sm mt-4">
          Don’t have an account?{" "}
          <a className="text-indigo-400 hover:underline" href="/register">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;

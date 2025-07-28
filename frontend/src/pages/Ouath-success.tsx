import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/stores/userStore";
import { HashLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/axios";
const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUserName } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");

      return response.data;
    },
  });
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setUserName({ username: data.username });
        navigate("/dashboard");
      } else if (error) {
        navigate("/signin");
      }
    }
  }, [data, error, isLoading]);

  return (
    <div className="h-screen flex flex-col justify-center w-full items-center">
      <HashLoader
        color="#3B82F6
"
      />
    </div>
  );
};

export default OAuthSuccess;

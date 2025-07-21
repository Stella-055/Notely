import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../stores/userStore";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);
  return <>{children}</>;
};

export default Protected;

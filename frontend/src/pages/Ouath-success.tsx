import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/stores/userStore";
import { HashLoader } from "react-spinners";
const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUserName } = useUser();
  useEffect(() => {
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };
    
      const username = getCookie("username");
      console.log("Username from cookie:", username);
    
      if (username) {
        setUserName({ username });
        navigate("/dashboard");
      } else {
        console.log("No username in cookie");
        navigate("/signin");
      }
  }, []);

  return(
    <div className="h-screen flex flex-col justify-center w-full items-center">
  <HashLoader
              color="#3B82F6
"
            />
    </div>
  ) 
 
};

export default OAuthSuccess;

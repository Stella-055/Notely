import { Route, Routes } from "react-router-dom";

import Enterprise from "./pages/Enterprise";

import Plans from "./pages/Plans";
import Whyus from "./pages/Whyus";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Forgotpassowrd from "./pages/Forgotpassowrd";
import { OTP } from "./pages/Otp";
import Protected from "./components/Protected";
import Common from "./pages/Common";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Updatepass from "./pages/Updatepass";
import Newnote from "./pages/Newnote";
import Resetpassword from "./pages/Resetpassword";
import { Toaster } from "@/components/ui/sonner";
import Trash from "./pages/Trash";
import Updatepassword from "./pages/Updatepassword";
import Bookmarked from "./pages/Bookmarked";
import Help from "./pages/Help";
import Security from "./pages/Security";
import Workspace from "./pages/Workspace";
import OAuthSuccess from "./pages/Ouath-success";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Common />}>
          <Route index element={<Home />} />
          <Route path="enterprise" element={<Enterprise />} />
          <Route path="whynotely" element={<Whyus />} />
          <Route path="plans" element={<Plans />} />
          <Route  path="oauth-success" element={<OAuthSuccess/>}/>
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<Signin />} />
          <Route path="forgotpassword" element={<Forgotpassowrd />} />
          <Route path="otp" element={<OTP />} />
          <Route path="resetpassword" element={<Resetpassword />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />{" "}
            </Protected>
          }
        >
          <Route
            index
            element={
              <Protected>
                <Overview />
              </Protected>
            }
          />
          <Route
            path="notes/:id"
            element={
              <Protected>
                <Notes />{" "}
              </Protected>
            }
          />
          <Route
            path="notes"
            element={
              <Protected>
                <Notes />{" "}
              </Protected>
            }
          />
          <Route
            path="profile"
            element={
              <Protected>
                <Profile />{" "}
              </Protected>
            }
          />
          <Route
            path="updatepassword"
            element={
              <Protected>
                <Updatepassword />{" "}
              </Protected>
            }
          />
          <Route
            path="password"
            element={
              <Protected>
                <Updatepass />{" "}
              </Protected>
            }
          />
          <Route
            path="newnote"
            element={
              <Protected>
                {" "}
                <Newnote />{" "}
              </Protected>
            }
          />
          <Route
            path="workspace"
            element={
              <Protected>
                {" "}
                <Workspace />{" "}
              </Protected>
            }
          />
          <Route
            path="trash"
            element={
              <Protected>
                {" "}
                <Trash />{" "}
              </Protected>
            }
          />
          <Route
            path="help"
            element={
              <Protected>
                {" "}
                <Help/>{" "}
              </Protected>
            }
          />
          <Route
            path="security"
            element={
              <Protected>
                {" "}
                <Security/>{" "}
              </Protected>
            }
          />
          <Route
            path="bookmark"
            element={
              <Protected>
                {" "}
                <Bookmarked />{" "}
              </Protected>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

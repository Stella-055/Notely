import { Route, Routes } from "react-router-dom"

import Enterprise from "./pages/Enterprise"

import Plans from "./pages/Plans"
import Whyus from "./pages/Whyus"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Signin from "./pages/Signin"
import Forgotpassowrd from "./pages/Forgotpassowrd"
import { OTP } from "./pages/Otp"

import Common from "./pages/Common"
import Dashboard from "./pages/Dashboard"
import Notes from "./pages/Notes"
import Overview from "./pages/Overview"
import Profile from "./pages/Profile"



function App() {


  return (
    <>
 
   <Routes >
    <Route path="/" element={<Common/>}>
   <Route index element={<Home/>}/>
    <Route path="enterprise" element={<Enterprise/>}/>
    <Route path="whynotely" element={<Whyus/>}/>
    <Route path="plans" element={<Plans/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="signin" element={<Signin/>}/>
    <Route path="forgotpassword" element={<Forgotpassowrd/>}/>
    <Route path="otp" element={<OTP/>}/></Route>
<Route path="/dashboard"  element={<Dashboard/>}> 
    <Route index element={<Overview/>}/>
    <Route path="notes" element={<Notes/>}/>
    <Route path="profile" element={<Profile/>}/>
    </Route>
   </Routes>
      
    </>
  )
}

export default App

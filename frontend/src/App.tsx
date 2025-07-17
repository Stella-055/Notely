import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Enterprise from "./pages/Enterprise"
import Footer from "./components/Footer"
import Plans from "./pages/Plans"
import Whyus from "./pages/Whyus"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Signin from "./pages/Signin"
import Forgotpassowrd from "./pages/Forgotpassowrd"
import { OTP } from "./pages/Otp"



function App() {


  return (
    <>
   <Nav/>
   <Routes>
   <Route path="/" element={<Home/>}/>
    <Route path="/enterprise" element={<Enterprise/>}/>
    <Route path="/whynotely" element={<Whyus/>}/>
    <Route path="/plans" element={<Plans/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/forgotpassword" element={<Forgotpassowrd/>}/>
    <Route path="/otp" element={<OTP/>}/>
   </Routes>
        <Footer/>
    </>
  )
}

export default App

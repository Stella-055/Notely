import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Enterprise from "./pages/Enterprise"
import Footer from "./components/Footer"
import Plans from "./pages/Plans"
import Whyus from "./pages/Whyus"
import Home from "./pages/Home"



function App() {


  return (
    <>
   <Nav/>
   <Routes>
   <Route path="/" element={<Home/>}/>
    <Route path="/enterprise" element={<Enterprise/>}/>
    <Route path="/whynotely" element={<Whyus/>}/>
    <Route path="/plans" element={<Plans/>}/>
   </Routes>
        <Footer/>
    </>
  )
}

export default App

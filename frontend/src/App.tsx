import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Enterprise from "./pages/Enterprise"
import Footer from "./components/Footer"
import Plans from "./pages/Plans"



function App() {


  return (
    <>
   <Nav/>
   <Routes>
    <Route path="/enterprise" element={<Enterprise/>}/>
    <Route path="/plans" element={<Plans/>}/>
   </Routes>
        <Footer/>
    </>
  )
}

export default App

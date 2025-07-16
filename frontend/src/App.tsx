import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Enterprise from "./pages/Enterprise"



function App() {


  return (
    <>
   <Nav/>
   <Routes>
    <Route path="/enterprise" element={<Enterprise/>}/>
   </Routes>
        
    </>
  )
}

export default App

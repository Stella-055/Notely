import { NavLink } from "react-router-dom"
import { Button } from "@mui/material"
const Nav = () => {
  return (
   
  
        <nav className="flex justify-around w-full py-5 border-b-black border-b fixed bg-gray-100 z-50 ">
     
        <NavLink to="/">
        <div className="flex gap-2.5">
        <img src="/notelylogo.png" alt="logo" className="w-9"  />
        <h2 className="text-2xl text-blue-700 font-extrabold">Note <span className="text-2xl font-extrabold text-blue-400">ly</span></h2>  </div> </NavLink>
    

     <div className="flex justify-between font-sans w-64">
<NavLink  to="/whynotely " className={({ isActive }) =>
                  isActive
                    ? ""
                    : "group "
                }>Why Notely
                <div className= " bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300" > </div></NavLink>
                <NavLink to="/enterprise" className={({ isActive }) =>
                  isActive
                    ? ""
                    : "group"
                }>Enterprise  <div className= " bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300" > </div></NavLink>
<NavLink to="/plans" className={({ isActive }) =>
                  isActive
                    ? ""
                    : "group"
                }>Plans  <div className= " bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300" > </div></NavLink>

     </div>

     <div className=" flex gap-2 justify-center items-center">
     <NavLink to="/login" className="font-bold">Login</NavLink>
     <Button variant="contained">Start Free</Button>
     </div>

        </nav>

      
  
  )
}

export default Nav

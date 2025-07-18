import Usernav from "@/components/Usernav"
import { RiCameraAiLine } from "react-icons/ri";
import Chip from '@mui/material/Chip';
import { Avatar } from "@mui/material"
const Profile = () => {
  return (
    <div className="w-full">
      <Usernav/>

    <div className="p-5">

        <h1 className="font-bold text-2xl">Account Information</h1>
        <div className=" px-10 w-5/6">
        <div className="my-6 w-28 relative">
        <Avatar alt="Remy Sharp" src="/profile.png" sx={{width:120,height:120}} />
       <div className="absolute top-20"><RiCameraAiLine size={30} /></div> 
       <Chip label="Free Tier"  />
        </div>
        <div className="flex flex-wrap gap-4">
            <div>   <label htmlFor="firstname">First Name</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
     
            <input id="firstname" className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="text" value="stella" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>
        <div> <label htmlFor="lastname">Last Name</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
            <input id="lastname" className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="email" placeholder="Enter your name" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>
        <div>   <label htmlFor="firstname">User Name</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
     
            <input id="username" className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="text" value="stella" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>
        <div>   <label htmlFor="useremail">Email</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
     
            <input id="useremail    " className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="text" value="stella" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>

        <div className="w-full flex flex-col">
            <label htmlFor="bio">Your Bio</label>
            <textarea className="w-80 border  border-gray-300 bg-gray-50" name="" id="bio"></textarea>
        </div>
        </div> </div>
    </div>
    </div>
  )
}

export default Profile

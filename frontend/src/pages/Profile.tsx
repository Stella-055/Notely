import Usernav from "@/components/Usernav"
import { RiCameraAiLine } from "react-icons/ri";
import Chip from '@mui/material/Chip';
import { Avatar, Button } from "@mui/material"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
const Profile = () => {
  return (
    <div className="w-full">
      <Usernav/>

    <div className="p-5">

        <h1 className="font-bold text-2xl">Account Information</h1>
        <div className=" px-10 w-5/6">
        <div className="my-6 w-28 relative">
        <Avatar alt="Remy Sharp" src="/profile.jpg" sx={{width:120,height:120}} />
       <div className="absolute top-20">
       <Popover>
  <PopoverTrigger><RiCameraAiLine size={30} color="gray" /></PopoverTrigger>
  <PopoverContent className=" w-96 px-3 bg-white rounded-lg border border-gray-500/30 shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">
            <div className="flex items-center justify-center w-11 h-11 bg-gray-500/10 rounded-full">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.124 11.083h4.75m5.541 3.959a1.584 1.584 0 0 1-1.583 1.583H3.165a1.583 1.583 0 0 1-1.583-1.583V3.958a1.583 1.583 0 0 1 1.583-1.583h3.959L8.707 4.75h7.125a1.583 1.583 0 0 1 1.583 1.583z" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="text-2xl text-gray-800 font-medium mt-3">Upload a Picture</h2>
            <p className="text-gray-500/80 mt-1">Attach the file below</p>
            <label htmlFor="fileInput" className="border-2 border-dotted border-gray-400 p-8 mt-6 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-gray-500">Drag picture here to upload</p>
                <p className="text-gray-400">Or <span className="text-blue-500 underline">click here</span> to select a file</p>
                <input id="fileInput" type="file" className="hidden" />
            </label>
        
            <div className="mt-2 flex justify-end gap-4">
                <button type="button" className="px-9 py-2 border border-gray-500/50 bg-white hover:bg-blue-100/30 active:scale-95 transition-all text-gray-500 rounded">
                    Cancel
                </button>
                <button type="button" className="px-6 py-2 bg-blue-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded">
                    Upload Picture
                </button>
            </div>
        </PopoverContent>
</Popover></div> 
       <Chip label="Free Tier"  />
        </div>
        <div className="flex flex-wrap gap-4">
            <div>   <label htmlFor="firstname" className="text-gray-500">First Name</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
     
            <input id="firstname" className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="text" value="stella" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>
        <div> <label htmlFor="lastname" className="text-gray-500">Last Name</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
            <input id="lastname" className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="email" placeholder="Enter your name" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>
        <div>   <label htmlFor="firstname" className="text-gray-500">User Name</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
     
            <input id="username" className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="text" value="stella" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>
        <div>   <label htmlFor="useremail" className="text-gray-500">Email</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-80 max-w-md">
     
            <input id="useremail    " className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="text" value="stella" />
            <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div> </div>

        <div className="flex flex-col">
            <label htmlFor="bio" className="text-gray-500">Your Bio</label>
            <textarea className="w-80 border  border-gray-300 bg-gray-50" name="" id="bio"></textarea>
        </div>
        <Button variant="contained" sx={{height:"2rem " , marginTop:'2rem',width:"20rem"}}>UPDATE</Button>
        </div> </div>
    </div>
    </div>
  )
}

export default Profile

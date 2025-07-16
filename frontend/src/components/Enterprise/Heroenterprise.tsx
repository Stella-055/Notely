import { Button } from "@mui/material"


const Heroenterprise = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col pt-8">
      <div className="flex flex-wrap items-center justify-center p-1.5 mt-24 rounded-full border w-80 text-xs">
        <div className="flex items-center">
            <img className="size-7 rounded-full border-3 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1"/>
            <img className="size-7 rounded-full border-3 border-white -translate-x-2"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2"/>
            <img className="size-7 rounded-full border-3 border-white -translate-x-4"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3"/>
        </div>
        <p className="-translate-x-2">Join community of 1m+ users </p>
       </div>
    <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-4xl mt-5 ">
    Notes that Work as Hard as Your Team
    </h1>
    <p className=" md:text-base max-md:px-2 text-center max-w-2xl mt-3">
    Empower your teams with secure, collaborative note-taking designed for the demands of modern enterprises. From shared knowledge bases to real-time updates, streamline communication and keep everyone aligned—no matter the size of your organization.


    </p>
    <Button variant="contained" sx={{marginTop:"2rem"}}>Get Started </Button>
    <img className="rounded-[50px] mt-16 h-72 w-full object-cover rounded-b-none max-w-5xl" src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop" alt=""></img>
    </div>
  )
}

export default Heroenterprise

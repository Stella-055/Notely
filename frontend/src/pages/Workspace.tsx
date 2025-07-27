import Cal from "@/components/Cal"
import Usernav from "@/components/Usernav"



const Workspace = () => {
  return (
    <div className="w-full h-screen">
      <Usernav/>
    <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl md:text-[40px] mt-16 text-gray-800 p-2 text-center">
            What do you want to Read About?
        </h1>
        <p className="text-base mt-6">Find something amazing with one simple message.</p>
        <div className="max-w-xl w-full bg-white rounded-xl overflow-hidden  border shadow">
            <textarea className="w-full p-3 pb-0 resize-none outline-none bg-transparent text-gray-800"
                placeholder="Type here your search" rows={1}></textarea>
            <div className="flex items-center justify-between pb-3 px-3">
                <button className="flex items-center justify-center bg-gray-500 p-1 rounded-full size-6"
                    aria-label="Add">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5h9M5.5 1v9" stroke="#CCD5E2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
                <button className="flex items-center justify-center p-1 rounded size-6 bg-blue-500" aria-label="Send">
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
       
    </div>
      <Cal/>
    </div>
  )
}

export default Workspace

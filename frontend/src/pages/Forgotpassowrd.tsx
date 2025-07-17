
import { Button } from "@mui/material"
const Forgotpassowrd = () => {
  return (
    <div className="w-full flex justify-center items-center pt-32">
    <div className="bg-gray-50 text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10 border">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forget Password?</h2>
            <label htmlFor="email">Email</label>
            <input id="email" className="w-full border mt-1 mb-3 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4" type="email" placeholder="Enter your email" />
            <Button variant="contained" fullWidth>Send Email</Button>
            <p className="text-center mt-4">Don’t have an account? <span className="text-blue-500 underline"> <a href="/register">Signup Now </a></span></p>
        </div></div>
  )
}

export default Forgotpassowrd

import { Button } from "@mui/material";

const Whtweoffer = () => {
  return (
    <div className="flex  flex-col flex-wrap  w-full justify-center mt-12 mb-12 items-center text-center">
      <h1 className="text-2xl font-bold mb-7 ">We Got You Covered</h1>
      <div className="flex  flex-wrap gap-3 w-full justify-center ">
        <div className="border border-black p-6 rounded-xs flex  flex-col items-center">
          <h1>Research</h1>
          <img src="/research.jpeg" className="w-36 h-28" alt="" />
        </div>
        <div className="border border-black p-6 rounded-xs flex  flex-col items-center">
          <h1>Meeting Notes</h1>
          <img src="/meet.jpg" className="w-36 h-28" />
        </div>
        <div className="border border-black p-6 rounded-xs flex  flex-col items-center">
          <h1>Thoughts</h1>
          <img src="/thought.jpg" className="w-36 h-28" />
        </div>
        <div className="border border-black p-6 rounded-xs flex  flex-col items-center">
          <h1>Class Notes</h1>
          <img src="/class.jpg" className="w-36 h-28" />
        </div>
        <div className="border border-black p-6 rounded-xs flex  flex-col items-center">
          <h1>Journal</h1>
          <img src="/meeting.jpg" className="w-36 h-28" />
        </div>{" "}
      </div>
      <div className="flex flex-col items-center justify-center max-w-5xl w-full mx-2 rounded-2xl shadow-md bg-gradient-to-r from-purple-600/20 to-blue-500/30 px-4 py-20 text-center mt-7">
        <div className="flex items-center -space-x-7">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="image"
            className="h-16 w-16 rounded-full border-4 border-white"
          />
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            alt="image"
            className="h-16 w-16 rounded-full border-4 border-white"
          />
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
            alt="image"
            className="h-16 w-16 rounded-full border-4 border-white"
          />
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="image"
            className="h-16 w-16 rounded-full border-4 border-white"
          />
        </div>
        <h1 className="text-3xl font-bold text-black mt-6">
          Refine your writing with Notely
        </h1>
        <p className="text-gray-700 mt-4 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis facere
          non sint ullam delectus itaque sunt, impedit eaque, molestiae
          quibusdam accusamus quaerat natus commodi unde dicta quo illo
          similique aspernatur!
        </p>
        <Button sx={{ marginTop: "1rem" }} variant="contained">
          Start Today
        </Button>
      </div>
    </div>
  );
};

export default Whtweoffer;

import Create from "@/components/Create";
import Usernav from "@/components/Usernav";

const Newnote = () => {
  return (
    <div className="flex flex-col w-full ">
      <Usernav />
      <div className="h-full w-full flex items-center justify-center">
      <Create />
      </div>
      
    </div>
  );
};

export default Newnote;

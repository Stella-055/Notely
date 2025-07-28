import Usernav from "@/components/Usernav";
import { useState } from "react";

const Cancel = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

  
    const threshold = 12;

    const handleMove = (e:React.MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: y * -threshold, y: x * threshold });
    };

  return (
     <div className="w-full flex flex-col items-center ">
            <Usernav/>
    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out h-fit mt-4 cursor-pointer max-w-80 bg-white"
    onMouseMove={handleMove}
    onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
>
    <img src="/cancel.gif"
        alt="Cancelled" className="w-full h-44 object-cover"
    />
    <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-gray-800">
      Your Transaction has been Cancelled
    </h3>
    <p className="text-sm px-4 pb-6 text-gray-600 w-5/6">
     Your transaction has been cancelled .No changes have been made to your package
    </p>
</div> </div>
  )
}

export default Cancel

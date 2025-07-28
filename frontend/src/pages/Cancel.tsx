import { useState } from "react";

const Cancel = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    // Adjust the threshold value to control the tilt effect
    const threshold = 12;

    const handleMove = (e:React.MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: y * -threshold, y: x * threshold });
    };

  return (
    <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white"
    onMouseMove={handleMove}
    onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
>
    <img src="./cancel.jpg"
        alt="Cancelled" className="w-full h-52 object-cover"
    />
    <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-gray-800">
        Interactive City Card
    </h3>
    <p className="text-sm px-4 pb-6 text-gray-600 w-5/6">
        Move your cursor over this card to experience a smooth 3D tilt animation, bringing depth and interactivity to your UI.
    </p>
</div>
  )
}

export default Cancel

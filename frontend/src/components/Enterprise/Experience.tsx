const Experience = () => {
  return (
    <div className="flex justify-center gap-3 flex-wrap ">
      <div className="w-80  md:h-96 h-60 rounded-[10px] flex flex-col items-center justify-center text-center">
        <img src="/images.png" className="w-20 h-20  shadow-md " alt="" />
        <h2 className="text-gray-900 text-xl font-semibold">Productivity</h2>
        <p className="text-gray-500 text-sm ">
          Lightweight design for instant productivity.euismod augue. Sed arcu
          ante, fermentum vel urna at, iaculis blandit odio. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis
        </p>
      </div>
      <div className="w-80 md:h-96 h-60 rounded-[10px] flex flex-col items-center justify-center text-center">
        <img src="/download.png" className="w-20 h-20  shadow-md " alt="" />
        <h2 className="text-gray-900 text-xl font-semibold">Collaboration</h2>
        <p className="text-gray-500 text-sm ">
          Lightweight design for instant productivity.euismod augue. Sed arcu
          ante, fermentum vel urna at, iaculis blandit odio. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis
        </p>
      </div>
      <div className="w-80 md:h-96 h-60 rounded-[10px] flex flex-col items-center justify-center text-center">
        <img src="/remember.png" className="w-20 h-20  shadow-md " alt="" />
        <h2 className="text-gray-900 text-xl font-semibold">
          Remember everything
        </h2>
        <p className="text-gray-500 text-sm ">
          Lightweight design for instant productivity.euismod augue. Sed arcu
          ante, fermentum vel urna at, iaculis blandit odio. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis
        </p>
      </div>
    </div>
  );
};

export default Experience;

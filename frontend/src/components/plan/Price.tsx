const Price = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <div className="flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-full text-sm w-80">
        <div className="flex items-center">
          <input
            type="radio"
            name="options"
            id="option1"
            className=" peer hidden"
            checked
          />
          <label
            htmlFor="option1"
            className="cursor-pointer rounded-full py-2 px-9 text-gray-500 transition-colors duration-200 peer-checked:bg-blue-600 peer-checked:text-white"
          >
            Monthly
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="options"
            id="option2"
            className=" peer hidden"
          />
          <label
            htmlFor="option2"
            className="cursor-pointer rounded-full  py-2 px-9 text-gray-500 transition-colors duration-200 peer-checked:bg-blue-500 peer-checked:text-white"
          >
            Yearly
          </label>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 mt-12 max-w-5xl">
        <div className="w-80 bg-white text-center text-gray-800/80 border border-gray-200 p-6 pb-16 rounded-lg">
          <p className="font-semibold">Personal</p>
          <h1 className="text-3xl font-semibold">
            $29<span className="text-gray-500 text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Create upto 100,000 notes</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Create up to 2,000 notebooks</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>10 GB monthly uploads</p>
            </li>
          </ul>
          <button
            type="button"
            className="bg-blue-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all"
          >
            Get Started
          </button>
        </div>

        <div className="w-80 bg-blue-500 relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
          <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-white text-black  border-t-blue-500 border-t rounded-full">
            Most Popular
          </p>
          <p className="font-semibold pt-2">Pro</p>
          <h1 className="text-3xl font-semibold">
            $79<span className="text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-white text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>Create upto 100,000 notes</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>Create up to 2,000 notebooks</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>20 GB monthly uploads</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="currentColor"
                />
              </svg>
              <p>Ai transcription</p>
            </li>
          </ul>
          <button
            type="button"
            className="bg-white text-sm w-full py-2 rounded text-blue-500 font-medium mt-7 hover:bg-gray-200 transition-all"
          >
            Get Started
          </button>
        </div>

        <div className="w-80 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg">
          <p className="font-semibold">Enterprise</p>
          <h1 className="text-3xl font-semibold">
            $199
            <span className="text-gray-500 text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Everthing in pro</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Dedicated support</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Unlimited projects</p>
            </li>
            <li className="flex  gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>20GB monthly uploads + 2GB / user</p>
            </li>
            <li className="flex  gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Enhanced security and compliance</p>
            </li>
            <li className="flex gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Advanced account and content administration</p>
            </li>
          </ul>
          <button
            type="button"
            className="bg-blue-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-blue-600 transition-all"
          >
            Get Started
          </button>
        </div>
        <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 pb-16 rounded-lg">
          <p className="font-semibold">Free</p>
          <h1 className="text-3xl font-semibold">
            $0<span className="text-gray-500 text-sm font-normal">/month</span>
          </h1>
          <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Create upto 50 notes</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>Create up to 1 notebooks</p>
            </li>
            <li className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                  fill="#6366F1"
                />
              </svg>
              <p>200 MB max. note size</p>
            </li>
          </ul>
          <button
            type="button"
            className="bg-blue-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Price;

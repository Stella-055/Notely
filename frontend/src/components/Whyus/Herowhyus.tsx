

const Herowhyus = () => {
  return (
    <main
        className="flex flex-col md:flex-row items-center max-md:text-center justify-between pt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center md:items-start">
            <button
                className="mt-16 mb-6 flex items-center space-x-2 border border-blue-600 text-blue-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
                type="button">
                <span>
                   <a href="/"> Explore how we help our users </a>
                </span>
                <span className="flex items-center justify-center size-6 p-1 rounded-full bg-blue-600">
                    <a href="/">
                    <svg width="14" height="11" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.5h14M9.5 1 15 6.5 9.5 12" stroke="#fff" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg> </a>
                </span>
            </button>
            <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
                Preferred choice For everyone
                <span className="text-blue-600">
                   ,For anyone
                </span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
                Learn why everyone trust our platform to archive their goals.
            </p>
            <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
                <button
                    className="bg-blue-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-blue-700 transition"
                    type="button">
                    <span>
                       <a href="#testimonials"> Read Success Stories</a>
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715" stroke="#fff"
                            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <a className="text-blue-600 bg-blue-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
                    href="/siginup">
                    Get Started
                </a>
            </div>
        </div>
        <div aria-label="Photos of leaders" className="mt-12 grid grid-cols-2 gap-6 pb-6">
            <img alt="" className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?q=80&w=735&auto=format&fit=crop"
                width="120" />
            <img alt="" className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop"
                width="120" />
            <img alt="" className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop"
                width="120" />
            <img alt="" className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop"
                width="120" />
        </div>
    </main>
  )
}

export default Herowhyus

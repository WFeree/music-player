import './navbar.css'

function Navbar(){
    return(
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="localhost:5173" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="src/assets/melodix.png" className="h-8 scale-250" alt="Melodix Logo"></img>
                    </a>
                    
                    <form className="w-lg mx-auto">   
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" autoComplete='off' id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Search for your favourite music" required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Search</button>
                        </div>
                    </form>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3" id='regLoginButtons'>
                        <button type="button" className="text-teal-700 border border-teal-700 hover:bg-teal-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center hover:cursor-pointer dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Register</button>
                        <button type="button" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center hover:cursor-pointer dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Login</button>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
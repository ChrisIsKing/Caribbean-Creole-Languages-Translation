const NavBar = () => {
    return (
        <div className="w-full bg-gray-800 m-0 p-0">
            <header className="container py-4">
                <nav className="">
                    <a href="/translate" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Translate
                    </a>
                    <a href="/bulk" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Bulk Upload
                    </a>
                    <a href="/generate" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Generate Pairs
                    </a>
                </nav>
            </header>
        </div>

    )
}

export default NavBar
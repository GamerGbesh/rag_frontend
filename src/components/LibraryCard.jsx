const LibraryCard = ({ library, onClick }) => {
    const date = new Date(library.updated_at)
    return (
        <div
            onClick={onClick}
            className="group p-5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-800"
        >
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                        {library.library_name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                        {library.library_description || "No description"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
      {/*<span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">*/}
      {/*  {library.item_count || 0} items*/}
      {/*</span>*/}
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>Last updated: {date.toLocaleDateString() || "Never"}</span>
            </div>
        </div>
    )
}

export default LibraryCard
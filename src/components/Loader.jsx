function Loader({ text = "Generating response..." }) {
    return (
        <div className="flex items-start gap-2 p-4 animate-pulse">
            {/* Spinner */}
            <div className="flex-shrink-0 w-5 h-5 border-2
            border-gray-300 border-t-blue-500 rounded-full
            animate-spin mt-1"></div>

            {/* Loading text with typing indicator */}
            <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-sm font-medium">{text}</p>
                <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
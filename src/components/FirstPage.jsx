export function FirstPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-blob"></div>
                <div className="absolute top-60 right-20 w-40 h-40 bg-indigo-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-2xl">
                {/* Logo/icon */}
                <div className="mx-auto w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>

                {/* Headings */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-blue-600">Synapse</span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                    Your personal library management system. Please sign in to access your collections.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/login"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Log In
                    </a>
                    <a
                        href="/signup"
                        className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-all"
                    >
                        Create Account
                    </a>
                </div>

            </div>

        </div>
    );
}

export default FirstPage;
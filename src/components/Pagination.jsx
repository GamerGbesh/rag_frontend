function Pagination({ currentQuestion, totalQuestions, onQuestionChange, setChosen}) {

    return (
        <div className="flex justify-center items-center gap-4 sm:gap-6 w-full max-w-4xl px-4 sm:px-8 py-8">
            {/* Previous Button (unchanged) */}
            <button
                className={`px-4 sm:px-6 py-2 sm:py-3 border rounded-lg font-semibold transition-all 
                duration-200 flex justify-center items-center gap-2 min-w-[100px]
      ${currentQuestion === 1
                    ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400'
                    : 'border-primary text-primary hover:bg-primary-50 hover:-translate-x-[2px] active:translate-x-0'
                }`}
                onClick={() => {
                    onQuestionChange(currentQuestion - 1);
                    setChosen(null);
                }}
                disabled={currentQuestion === 1}
                aria-label="Previous question"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
            </button>

            {/* Question Info (unchanged) */}
            <span className="text-gray-500 text-sm sm:text-base min-w-[120px] text-center">
    Question {currentQuestion} of {totalQuestions}
  </span>

            {/* Fixed Next/Done Button */}
            <button
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all 
                duration-200 flex justify-center items-center gap-2 min-w-[100px]
      ${currentQuestion === totalQuestions
                    ? 'bg-green-600 hover:bg-green-700 hover:-translate-y-[2px] active:translate-y-0'
                    : 'bg-blue-600 hover:bg-blue-700 hover:translate-x-[2px] active:translate-x-0'
                }`}
                onClick={() => {
                    onQuestionChange(currentQuestion + 1);
                    setChosen(null);
                }}
                aria-label={currentQuestion === totalQuestions ? "Finish quiz" : "Next question"}
            >
                {currentQuestion === totalQuestions ? 'Done' : 'Next'}
                {currentQuestion !== totalQuestions && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </button>
        </div>
    )
}

export default Pagination;
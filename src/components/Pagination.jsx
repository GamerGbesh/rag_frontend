import styles from "../css/pagination.module.css"

function Pagination({ currentQuestion, totalQuestions, onQuestionChange, setChosen}) {

    return (
        <div className={styles.pagination}>
            <button
            className={styles.paginationBtn}
            onClick={() => {onQuestionChange(currentQuestion - 1); setChosen(null)}}
            disabled={currentQuestion === 1}>
                Previous
            </button>

            <span className={styles.paginationInfo}>Question {currentQuestion} of {totalQuestions}</span>

            <button
                className={styles.paginationBtn}
            onClick={() => {onQuestionChange(currentQuestion + 1);  setChosen(null)}}>
                {currentQuestion === totalQuestions ? "Done" : "Next"}
            </button>
        </div>
    )
}

export default Pagination;
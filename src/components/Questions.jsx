import styles from "../css/questions.module.css"
import Pagination from "./Pagination.jsx";

function Questions({question, answers, explanation, currentQuestion, totalQuestions, onQuestionChange}) {
    return (
        <div className={styles.questionSet}>
            <p className={styles.question}>
                {question}
            </p>
            <div className={styles.answers}>
                <p className={styles.answer}>
                    {answers[0]}
                </p>
                <p className={styles.answer}>
                    {answers[1]}
                </p>
                <p className={styles.answer}>
                    {answers[2]}
                </p>
                <p className={styles.answer}>
                    {answers[3]}
                </p>
            </div>
            <p className={styles.explanation}>
                {explanation}
            </p>
            <Pagination currentQuestion={currentQuestion} totalQuestions={totalQuestions} onQuestionChange={onQuestionChange} />
        </div>
    )
}

export default Questions;
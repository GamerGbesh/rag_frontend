import styles from "../css/questions.module.css"
import Pagination from "./Pagination.jsx";
import {useState} from "react";

function Questions({question,
                       answers,
                       explanation,
                       currentQuestion,
                       totalQuestions,
                       onQuestionChange,
                       correctAnswer,
                       correct,
                       setCorrect,
                   }) {
    const [chosen, setChosen] = useState(false)

    function onClick (num){
        setChosen(true)
        if (num === correctAnswer) setCorrect(correct + 1)
    }

    if (chosen) {
        return (
            <div className={styles.questionSet}>
                <p className={styles.question}>
                    {question}
                </p>
                <div className={styles.answers}>
                    {answers.map((answer, index) => (
                        <p key={index}
                           className={`${styles.answer} ${index===correctAnswer ? styles.correct : styles.incorrect}`}
                        >
                            {answer}
                        </p>
                    ))}
                </div>
                <span>Click and hold the empty space below to see the explanation</span>
                <div className={styles.explanation}>
                    <span>{explanation}</span>
                </div>
                <Pagination
                    currentQuestion={currentQuestion}
                    totalQuestions={totalQuestions}
                    onQuestionChange={onQuestionChange}
                    setChosen={setChosen}
                />
            </div>
        )
    }

    return (
        <div className={styles.questionSet}>
            <p className={styles.question}>
                {question}
            </p>
            <div className={styles.answers}>
                {answers.map((answer, index) => (
                    <p key={index} className={styles.answer} onClick={() => onClick(index)}>
                        {answer}
                    </p>
                ))}
            </div>
            {/*<span>Click and hold the empty space below to see the explanation</span>*/}
            {/*<div className={styles.explanation}>*/}
            {/*    <span>{explanation}</span>*/}
            {/*</div>*/}
            {/*<Pagination*/}
            {/*    currentQuestion={currentQuestion}*/}
            {/*    totalQuestions={totalQuestions}*/}
            {/*    onQuestionChange={onQuestionChange}*/}
            {/*    setChosen={setChosen}*/}
            {/*/>*/}
        </div>
    )
}

export default Questions;
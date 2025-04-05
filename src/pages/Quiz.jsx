import Questions from "../components/Questions.jsx";
import styles from "../css/quiz.module.css"
import {useEffect, useState} from "react";
import api from "../services/api.js";
import {useLocation} from "react-router-dom";

function Quiz() {
    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [explanation, setExplanation] = useState([]);

    const location = useLocation();
    const document_id = location.state.document_id;
    const number_of_questions = location.state.number_of_questions;
    const library_id = location.state.library_id;

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            const response = api.get("/quiz", {
                params: {
                    document_id: document_id,
                    number_of_questions: number_of_questions,
                    library_id:library_id,
                    page: currentQuestion,
            }
        })
                .then((res) => {
                    setQuestion(res.data.results[0][0][1]);
                    setAnswers(res.data.results[0][1][1]);
                    setExplanation(res.data.results[0][3][1]);
                    console.log(res.data);
                })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }
    fetchQuestions();
    }, [currentQuestion]);

    function onQuestionChange(question) {
        setCurrentQuestion(question);
    }

    return (
        <div className={styles.container}>
            {loading ? (
             <p>Generating questions</p>
            ):
                <Questions question={question}
                           answers={answers}
                           explanation={explanation}
                           currentPage={currentQuestion}
                           totalPages={number_of_questions}
                           onQuestionChange={onQuestionChange}
                />
            }
        </div>
    )
}

export default Quiz;
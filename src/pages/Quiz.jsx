import Questions from "../components/Questions.jsx";
import styles from "../css/quiz.module.css"
import {useEffect, useState} from "react";
import api from "../services/api.js";
import {useLocation, useNavigate} from "react-router-dom";
import Popup from "../components/Popup.jsx";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [explanation, setExplanation] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [done, setDone] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [answered, setAnswered] = useState(0);

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
            }
        })
                .then((res) => {
                    setQuestions(res.data);
                    setCurrentQuestion(1);
                    console.log(res.data);
                })
            .catch((err) => {
                console.log(err);
            })
                .finally(() => {setLoading(false);});
    }
    fetchQuestions();
    }, []);



    useEffect(() => {
        function fetchQuestions() {
            setQuestion(questions[currentQuestion-1].question);
            setAnswers(questions[currentQuestion-1].options);
            setExplanation(questions[currentQuestion-1].explanation);
            switch (questions[currentQuestion-1].answer){
                case "A": setCorrectAnswer(0); break;
                case "B": setCorrectAnswer(1); break;
                case "C": setCorrectAnswer(2); break;
                case "D": setCorrectAnswer(3); break;
            }
            console.log(correctAnswer);

        }
        if (!loading) fetchQuestions();
    }, [currentQuestion]);

    function onQuestionChange(question)
    {
        if (question > number_of_questions) setDone(true);

        else setCurrentQuestion(question);
    }


    return (
        <div className={styles.container}>
            {loading ? (
             <p>Generating questions...</p>
            ):
                <>
                    {done && <Popup count={number_of_questions}  correct={correct} library_id={library_id} />}
                    <Questions question={question}
                               answers={answers}
                               explanation={explanation}
                               currentQuestion={currentQuestion}
                               totalQuestions={number_of_questions}
                               correctAnswer={correctAnswer}
                               onQuestionChange={onQuestionChange}
                               setCorrect={setCorrect}
                               correct={correct}
                               answered={answered}
                               setAnswered={setAnswered}
                    />
                </>
            }
        </div>
    )
}

export default Quiz;
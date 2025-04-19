import styles from "../css/popup.module.css"
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function Popup({ onSubmit, correct, count, library_id, setShowPopup }) {
    const [questionCount, setQuestionCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        // Add class to body when popup mounts
        document.body.classList.add('popupOpen');

        // Cleanup function to remove class when popup unmounts
        return () => {
            document.body.classList.remove('popupOpen');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(questionCount);
    };

    if (count) {
        return (
            <div className={styles.popupOverlay}>
                <form className={styles.popup} >
                    <div className={styles.formGroup}>
                        <p>You got {correct} of {count}</p>
                    </div>
                    <button className={styles.submitBtn} onClick={(e) => {
                        e.preventDefault();
                        navigate("/Library", {state: {id: library_id}});
                    }}>
                        Done
                    </button>
                </form>

            </div>
        )
    }

    return (
        <div className={styles.popupOverlay}>
            <form className={styles.popup} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>

                    <p>How many questions (min:5, max:10)</p>
                    <input
                        type="number"
                        placeholder="Select a number"
                        min={5}
                        max={10}
                        value={questionCount}
                        onChange={(e) =>
                            setQuestionCount(Math.min(Math.max(parseInt(e.target.value), 5), 20))}
                        required
                    />
                </div>
                <div className={"flex gap-2.5"}>
                    <button type="submit" className={styles.submitBtn}>
                        Done
                    </button>
                    <button className={"border-2 p-3 rounded-3xl bg-red-400 cursor-pointer"}
                    onClick={(e)=>{
                        e.preventDefault();
                        setShowPopup(null)
                    }}>X</button>
                </div>
            </form>
        </div>
    );
}

export default Popup;
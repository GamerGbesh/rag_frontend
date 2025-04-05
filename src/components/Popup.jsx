import styles from "../css/popup.module.css"
import { useState, useEffect } from "react";

function Popup({ onSubmit }) {
    const [questionCount, setQuestionCount] = useState(10);

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

    return (
        <div className={styles.popupOverlay}>
            <form className={styles.popup} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <p>How many questions (min:5, max:20)</p>
                    <input
                        type="number"
                        placeholder="Select a number"
                        min={5}
                        max={20}
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Math.min(Math.max(parseInt(e.target.value), 5), 20))}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitBtn}>
                    Done
                </button>
            </form>
        </div>
    );
}

export default Popup;
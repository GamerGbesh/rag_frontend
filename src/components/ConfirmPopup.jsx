import styles from "../css/popup.module.css"
import { useState, useEffect } from "react";

function ConfirmPopup( {text="Do you want to delete this course?", onClick } ) {
    useEffect(() => {
        // Add class to body when popup mounts
        document.body.classList.add('popupOpen');

        // Cleanup function to remove class when popup unmounts
        return () => {
            document.body.classList.remove('popupOpen');
        };
    }, []);



    return (
        <div className={styles.popupOverlay}>
            <form className={styles.popup}>
                <div className={styles.formGroup}>
                    <p>{text}</p>
                </div>
                <div className="flex">
                    <button className="p-4 w-full bg-red-400
                    text-white text-shadow-blue-500 cursor-pointer
                    rounded-lg gap-1" value={"No"} onClick={onClick}>
                        No
                    </button>
                    <button className="p-4 w-full bg-green-600
                    text-white text-shadow-blue-500 cursor-pointer
                    rounded-lg gap-1"  value={"Yes"} onClick={onClick}>
                        Yes
                    </button>
                </div>
            </form>

        </div>
    )

}

export default ConfirmPopup
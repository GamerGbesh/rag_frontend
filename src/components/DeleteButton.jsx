import styles from "../css/deletebutton.module.css"

function DeleteButton({message="Delete Library"}) {
    return (
        <>
        <button className={styles.button}>{message}</button>
        </>
    )
}

export default DeleteButton;
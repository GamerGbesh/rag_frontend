import styles from "../css/deletebutton.module.css"

function DeleteButton({message="Delete Library", customFunction, id}) {
    return (
        <>
            {id ? <button className={styles.button} onClick={() => customFunction(id)}>{message}</button>
            : <button className={styles.button} onClick={customFunction}>{message}</button>}
        </>
    )
}

export default DeleteButton;
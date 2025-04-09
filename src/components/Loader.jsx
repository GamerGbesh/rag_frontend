import styles from "../css/loader.module.css";

function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p className={styles.info}>Generating response...</p>
        </div>
    );
}

export default Loader;

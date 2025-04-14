import styles from "../css/contentcard.module.css";

function ContentCard({
                         content,
                         makeFunction,
                         deleteFunction,
                         permission
                     }) {
    const baseUrl = "http://localhost:8000";
    const fileUrl = baseUrl + content.file;

    return (
        <div className={styles.contentCard}>
            <a
                href={fileUrl}
                key={content.id}
                className={styles.cardName}
                download
                title={content.file.split("/").pop()} // Full filename as tooltip
            >
                <span className={styles.fileNameText}>
                    {content.file.split("/").pop()}
                </span>
            </a>

            <div className={styles.btnGroup}>
                <button
                    className={styles.contentBtn}
                    onClick={() => makeFunction(content.id)}
                >
                    Generate quiz
                </button>
                {permission && (
                    <button
                        className={styles.contentBtn}
                        onClick={() => deleteFunction(content.id)}
                        aria-label="Delete"
                    >
                        🗑️
                    </button>
                )}
            </div>
        </div>
    );
}

export default ContentCard;
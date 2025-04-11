import styles from "../css/contentcard.module.css"

function ContentCard({
                         content,
                         makeFunction,
                         quiz, creator,
                         removeFunction,
                         deleteFunction,
                         permission
}) {
    const baseUrl = "http://localhost:8000"

    if (quiz){
        const fileUrl = baseUrl + content.file
        return (
            <div className={styles.contentCard}>
                <a href={fileUrl} key={content.id}
                   className={styles.contentName}
                   download>
                    {content.file.split("/")[content.file.split("/").length - 1].slice(0, 65)}
                </a>

                <div className={styles.btnGroup}>
                    <button
                        className={styles.contentBtn}
                        onClick={() => makeFunction(content.id)}
                    >
                        Generate quiz
                    </button>
                    {permission && <button
                        className={styles.contentBtn}
                        onClick={() => deleteFunction(content.id)}
                    >
                        🗑️
                    </button>}
                </div>

            </div>
        )
    }

    return (
        <div className={`${styles.contentCard} ${content.is_admin ? styles.colored : ""}`}>
            <span key={content.user.id} className={styles.contentName}>{content.user.username}</span>

            <div className="btn-group">

                {creator && content.is_admin ?
                    <button
                        className={styles.contentBtn}
                        onClick={() => removeFunction(content.user.id)}
                    >
                        Demote admin
                    </button>
                : creator && <button
                    className={styles.contentBtn}
                    onClick={() => makeFunction(content.user.id)}
                >
                    Make admin
                </button>}

                {creator &&
                    <button
                        className={styles.contentBtn}
                        onClick={() => deleteFunction(content.user.id)}
                    >
                        🗑️
                    </button>}
            </div>
        </div>
    )
}

export default ContentCard;
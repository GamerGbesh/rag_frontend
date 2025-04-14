import styles from "../css/contentcard.module.css";

function MemberCard({
                        content,
                        makeFunction,
                        creator,
                        removeFunction,
                        deleteFunction,
                    }) {
    return (
        <div className={`${styles.memberCard} ${content.is_admin ? styles.colored : ""}`}>
            <span key={content.user.id} className={styles.cardName}>
                {content.user.username}
            </span>

            <div className={styles.btnGroup}>
                {creator && content.is_admin ? (
                    <button
                        className={styles.contentBtn}
                        onClick={() => removeFunction(content.user.id)}
                    >
                        Demote admin
                    </button>
                ) : creator && (
                    <button
                        className={styles.contentBtn}
                        onClick={() => makeFunction(content.user.id)}
                    >
                        Make admin
                    </button>
                )}

                {creator && (
                    <button
                        className={styles.contentBtn}
                        onClick={() => deleteFunction(content.user.id)}
                        aria-label="Delete"
                    >
                        🗑️
                    </button>
                )}
            </div>
        </div>
    );
}

export default MemberCard;
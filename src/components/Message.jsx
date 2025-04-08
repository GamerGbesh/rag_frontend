import styles from "../css/message.module.css"
import { marked } from "marked"
import DOMPurify from "dompurify";

function Message({ response, user}) {
    const rawHtml = marked(response || "")
    const cleanHtml = DOMPurify.sanitize(rawHtml)

    return (
        <div className={`${styles.messageBox} ${user ? styles.user : styles.ai}`}>
            <span dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>
    )
}

export default Message
import styles from "../css/message.module.css"
import { marked } from "marked"
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

function Message({ response, user }) {
    const [processedHtml, setProcessedHtml] = useState("");

    useEffect(() => {
        // Process markdown and sanitize HTML whenever response changes
        const rawHtml = marked(response || "");
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        setProcessedHtml(cleanHtml);
    }, [response]);

    return (
        <div className={`${styles.messageBox} ${user ? styles.user : styles.ai}`}>
            <span dangerouslySetInnerHTML={{ __html: processedHtml }} />
        </div>
    );
}

export default Message
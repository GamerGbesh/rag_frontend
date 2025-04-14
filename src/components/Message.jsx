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
        <div className={`p-3 rounded-xl max-w-[70%] w-fit mb-3 break-words relative
        ${user ?
            'bg-teal-100 ml-auto rounded-br-none' :
            'bg-gray-100 mr-auto rounded-bl-none'
        }`}>
            <span dangerouslySetInnerHTML={{ __html: processedHtml }} />
        </div>
    );
}

export default Message
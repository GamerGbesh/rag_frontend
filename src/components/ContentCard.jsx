import "../css/contentcard.css"
import api from "../services/api.js";

function ContentCard({content, makeFunction, quiz, creator, removeFunction, deleteFunction}) {
    const baseUrl = "http://localhost:8000"

    if (quiz){
        const fileUrl = baseUrl + content.file
        return (
            <div className={"content-card"}>
                <a href={fileUrl} key={content.id}
                   className={"content-name"}
                   download>
                    {content.file.split("/")[content.file.split("/").length - 1].slice(0, 65)}
                </a>

                <div className="btn-group">
                    <button className={"content-btn"} onClick={() => makeFunction(content.id)}>Generate quiz</button>
                    <button className={"content-btn"} onClick={() => deleteFunction(content.id)}>🗑️</button>
                </div>

            </div>
        )
    }

    return (
        <div className={`content-card ${content.is_admin ? "colored" : ""}`}>
            <span key={content.user.id} className={"content-name"}>{content.user.username}</span>

            <div className="btn-group">

                {creator && content.is_admin ? <button className={"content-btn"} onClick={() => removeFunction(content.user.id)}>Demote admin</button>
                : creator && <button className={"content-btn"} onClick={() => makeFunction(content.user.id)}>Make admin</button>}

                {creator && <button className={"content-btn"} onClick={() => deleteFunction(content.user.id)}>🗑️</button>}
            </div>
        </div>
    )
}

export default ContentCard;
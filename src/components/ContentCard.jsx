import "../css/contentcard.css"
import api from "../services/api.js";

function ContentCard({content}) {
    const baseUrl = "http://localhost:8000"

    const deleteContent = async (id) => {
        try{
            await api.delete("")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className={"content-card"}>
            <a href={baseUrl + content.file} key={content.id} className={"content-name"} download>{content.file.split("/")[content.file.split("/").length - 1].slice(0, 65)}</a>
            <button className={"content-description"} onClick={() => deleteContent(content.id)}>🗑️</button>
        </div>
    )
}

export default ContentCard;
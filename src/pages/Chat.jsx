import {useEffect,  useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../css/chat.module.css"
import Message from "../components/Message.jsx";
import SideBar from "../components/SideBar.jsx";
import AutoResizingTextarea from "../components/AutoResizingTextArea.jsx";
import api from "../services/api.js";
import Loader from "../components/Loader.jsx";


function Chat() {
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true);
    const query = location.state?.query
    const course_id = location.state?.course_id
    const library_id = location.state?.library_id
    const data = {header: "LLM", body:[{course_name: "LLaMA 3.2"}]}

    useEffect(() => {

        chat(query, true)

    }, [])



    async function chat(query, start=false){
        console.log("🚀 Calling chat with query:", query, "start:", start);
        if (query.length === 0){
            return
        }
        if (start) setMessages([{content:query, role:"user"}])
        else setMessages((prev) => [...prev, {content: query, role: "user"}])
        setLoading(true)
        api.get("question", {
            params: {
                query,
                course_id: course_id,
                library_id: library_id
            }
        })
            .then((response) => {
                console.log(response)
                setMessages((prev) => [...prev, {content:response.data.LLM_response, role:"chat"}])
            })
            .catch((error) => {console.log(error)})
            .finally(() => setLoading(false))
    }

    return (
        <>
            <SideBar data={data}/>
            <div className={styles.chat}>
                {messages?.map((message, index) => (
                    <Message response={message.content} key={index} user={message.role === "user"} />
                ))}
                {loading && <Loader/>}
            </div>

            <AutoResizingTextarea
                placeholder="Type your message..."
                minRows={1}
                maxRows={10}
                handleClick={chat}
            />

        </>
    )
}


export default Chat;
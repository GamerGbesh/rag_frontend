import {useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import api from "../services/api.js";
import styles from "../css/signup.module.css"
import Loader from "./Loader.jsx";


export function AddContent({course_id, library_id, activeFunction}) {
    const [error, setError] = useState(null);
    const {setContent, content} = useAuthContext()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const MAX_FILE_SIZE = 7;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!file) {
            setError("Please upload a file");
            setLoading(false);
            return;
        }

        const fileSize = file.size / (1024 * 1024);
        if (fileSize > MAX_FILE_SIZE){
            alert(`File size is too large. Maximum allowed size is ${MAX_FILE_SIZE}MB`)
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("course_id", course_id);
        formData.append("library_id", library_id);
        formData.append("file", file)
        await api.post("Documents", formData, {headers: {
            "Content-Type": "multipart/form-data",
        },})
            .then(async () => {
                setError(null);
                await activeFunction(course_id, true)
                    .then(() => {setContent(!content);})
                    .catch((error) => {console.log(error)});

            })
            .catch(err => {setError(err.response.data.error)})
            .finally(() => setLoading(false));

    }

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <h2>Upload Document</h2>
                {error && <div className={styles.alert}>{error}</div>}
                <span>Accepted: docx, pdf, pptx, txt, jpeg, jpg, png</span>
                <p className={"text-red-400 text-right"}>Max File Size: {MAX_FILE_SIZE}MB</p>
                <div style={{
                    border: "1px solid grey",
                    padding: "10px",
                    borderRadius: "10px",
                    paddingTop: "10px",
                    paddingBottom: "10px",

                }}>
                    <input type="file" required onChange={handleChange} style={{ width: "100%" }} />
                </div>
                {!loading ? <button type={"submit"}
                                    className={styles.submit} >
                                        Submit
                            </button> : <Loader text={"Uploading Document..."} />}
            </form>
        </>
    )
}
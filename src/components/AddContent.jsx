import {useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import api from "../services/api.js";
import "../css/createlibrary.css"


export function AddContent({course_id, library_id, activeFunction}) {
    const [error, setError] = useState(null);
    const {setContent, content} = useAuthContext()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!file) {
            setError("Please upload a file");
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
            .then(async result => {
                setError(null);
                await activeFunction(course_id)
                    .then((data) => {setContent(!content);})
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
            <form onSubmit={handleSubmit} className="form-document">
                <h2>Upload Document</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <span>Accepted: docx, pdf, pptx, txt, jpeg, jpg, png</span>
                <div style={{
                    border: "1px solid grey",
                    padding: "10px",
                    borderRadius: "10px",
                    paddingTop: "10px",
                    paddingBottom: "10px",

                }}>
                    <input type="file" required onChange={handleChange} style={{ width: "100%" }} />
                </div>
                {!loading ? <button type={"submit"} className={"submit"} >Submit</button> : <p>Uploading document....</p>}
            </form>
        </>
    )
}
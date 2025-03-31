import {useState} from "react";
import "../css/createlibrary.css"
import {useAuthContext} from "../contexts/AuthContext.jsx";
import api from "../services/api.js";

function AddCourse({id}) {
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [description, setDescription] = useState(null);
    const {setStatus, status} = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.post("Courses", {course_name:course, course_description:description, library_id:id})
            .then(result => {setError(null)})
            .catch(err => {setError(err.response.data.detail || err.response.data.error)});
        setStatus(!status)

    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <h2>Create Course</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                    <input type="text" placeholder="Course Name" required onChange={(e) => setCourse(e.target.value)} />
                    <input type="text" placeholder="Course Description" required onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" className={"submit"}>Submit</button>
            </form>
        </>
    )
}

export default AddCourse;
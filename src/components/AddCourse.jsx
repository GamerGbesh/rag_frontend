import {useState} from "react";
import styles from "../css/signup.module.css"
import {useAuthContext} from "../contexts/AuthContext.jsx";
import api from "../services/api.js";

function AddCourse({id, addFunction}) {
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [description, setDescription] = useState(null);
    const {setStatus, status} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.post("Courses", {
            course_name:course,
            course_description:description,
            library_id:id
        })
            .then(() => {setError(null)})
            .catch(err => {setError(err.response.data.detail || err.response.data.error)});

        setStatus(!status)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <h2>Create Course</h2>
                {error && <div className={styles.alert}>{error}</div>}

                <div className={styles.formGroup}>
                    <input type="text"
                           placeholder="Course Name"
                           required
                           onChange={(e) => setCourse(e.target.value)} />
                    <input type="text"
                           placeholder="Course Description"
                           required
                           onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" className={styles.submit}>Submit</button>
                <button onClick={addFunction} className="bg-blue-500 text-white border-none
              rounded-full w-10 h-10 text-xl cursor-pointer transition-all m-4 relative left-[40%]
              inline-flex items-center justify-center hover:bg-blue-600 hover:scale-110">
                    X
                </button>
            </form>
        </>
    )
}

export default AddCourse;
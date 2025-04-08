import SideBar from "../components/SideBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import FirstPage from "../components/FirstPage.jsx";
import AddCourse from "../components/AddCourse.jsx";
import ContentCard from "../components/ContentCard.jsx";
import {AddContent} from "../components/AddContent.jsx";
import "../css/home.css"
import AutoResizingTextarea from "../components/AutoResizingTextArea.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import Popup from "../components/Popup.jsx";


function Library() {
    const location = useLocation()
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const {user, status, setStatus,setAddLibrary, addLibrary, content, setContent} = useAuthContext()
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [courseId, setCourseId] = useState(-1);
    const [document, setDocument] = useState(null);



    useEffect(() => {
        const setting = () => {
            setAddLibrary(false)
            setContent(false)
        }
        setting();
    }, []);

    // Fetch data function here
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get("getCourses", {
                    params: {library_id: id}
                })
                console.log(response)
                setData(response.data)
            }
            catch(err){
                console.log(err);
                navigate("/")
            }
        }

        fetchData()
    }, [status])

    // Async function to get data to display on library page
    const activeFunction = async (index) => {
        try {
            const response = await api.get("getDocuments", {
                params: {course_id: index, library_id: id},
            })
            setCourseData(response.data)
            setCourseId(index);
            console.log(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    const addFunction = (e) =>{
        setAddLibrary(!addLibrary);
        if (addLibrary) {
            e.target.innerHTML = "+";
        }
        else {
            e.target.innerHTML = "X"
        }

    }

    const headerFunction = (index) => {
        navigate("/library/details", {state: {library_id: id}})
    }

    const handleClick = () => {
        setContent(!content)
    }

    async function deleteCourse(course_id) {
        await api.delete("Courses", {
            data: {
                course_id,
                library_id: id,
            }
        })
            .then(res => {console.log(res); setStatus(!status); setCourseId(-1)})
            .catch(err => console.log(err))
    }

    async function deleteFunction(doc_id) {
        await api.delete("deleteDocuments", {
            data: {
                library_id: id,
                doc_id: doc_id,
            }
        })
            .then(res => {console.log(res); setStatus(!status); activeFunction(courseId)})
    }

    function makeFunction(doc_id) {
        setDocument(doc_id);
    }

    function onSubmit(questionNumber){
        navigate("/quiz", {state: {document_id: document, library_id: id, number_of_questions: questionNumber}})
    }


    if (!user){
        return <FirstPage />
    }

    if (courseId === -1) {
        return (
            <>
                <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>

                {addLibrary ? <AddCourse id={id}/>
                    : (
                        <div className="Instructions">
                            Select a course from the side-bar to view its content.<br/>
                            Create a course using the + button if you have no course.<br/>
                            The AI would be enabled once documents have been uploaded to the course.
                        </div>)
                }
            </>
        )
    }

    function chat (query) {
        if (query.length === 0){
            return
        }
        navigate("/chat", {state: {query: query, course_id: courseId, library_id: id}})
    }


    return (
        <>
            <SideBar data={data}
                     activeFunction={activeFunction}
                     headerFunction={headerFunction}
                     addFunction={addFunction}
            />

            {addLibrary ? <AddCourse id={id}/>
            : (
                <>
                    {data?.active && <DeleteButton message={"Delete Course"} customFunction={deleteCourse} id={courseId}/>}
                    {document && <Popup onSubmit={onSubmit}/>}
                    <div className="content-area">
                        {!content ?
                        courseData?.data?.map((docs, index) => (
                            <ContentCard content={docs}
                                         key={docs.id}
                                         quiz={true}
                                         permission={courseData?.permission}
                                         deleteFunction={deleteFunction}
                                         makeFunction={makeFunction}
                            />
                        ))
                        :(
                            <AddContent course_id={courseId} library_id={id} activeFunction={activeFunction}/>
                        )}
                        {data?.active &&
                            <button  className={"submit"}
                                     onClick={handleClick}
                                     style={{
                                         width: "30%",
                                         position: "relative",
                                         left: "35%",
                                     }}
                            >
                                {content ? "X" : "Add Document"}
                            </button>}
                    </div>
                </>
                )
            }

            {courseData?.data.length >= 1 ? <div style={{ width: '300px' }}>
                <AutoResizingTextarea
                    placeholder="Type your message..."
                    minRows={1}
                    maxRows={10}
                    handleClick={chat}
                />

            </div> : (
                !addLibrary && <p style={{
                    color:"red",
                    "font-size": "1.250rem",
                    "position":"relative",
                    bottom:"30px"}}>
                    Add documents to be able to use the AI
                </p>
            )}

        </>
    )
}

export default Library;
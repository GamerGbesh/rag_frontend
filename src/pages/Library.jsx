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


function Library() {
    const location = useLocation()
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const {user, status, setAddLibrary, addLibrary, content, setContent} = useAuthContext()
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [courseId, setCourseId] = useState(-1);


    const fetchDataPerCourse = async (id) => {
        try {
            const response = await api.get("getDocuments", {
                params: {course_id: id, library_id: id},
            })
            setCourseData(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }

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


    if (!user){
        return <FirstPage />
    }

    if (courseId === -1) {
        return (
            <div className="Instructions">
                <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>
                {addLibrary ? <AddCourse id={id}/>
                    : ( <>
                        <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>
                        Select a course from the side-bar to view its content.<br/>
                        Create a course using the + button if you have no course.<br/>
                        The AI would be enabled once documents have been uploaded to the course.
                    </>)
                }
            </div>
        )
    }

    return (
        <>
        <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>

            {addLibrary ? <AddCourse id={id}/>
            : (
                <>
                    {data?.active && <DeleteButton message={"Delete Course"}/>}
                    <div className="content-area">
                        {!content ?
                        courseData?.map((docs, index) => (
                            <ContentCard content={docs} key={docs.id} quiz={true}/>
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

            {courseData.length >= 1 ? <div style={{ width: '300px' }}>
                <AutoResizingTextarea
                    placeholder="Type your message..."
                    minRows={1}
                    maxRows={10}
                    style={{
                        padding: '50px',

                        border: '1px solid #ccc',
                        borderRadius: '20px',
                        fontFamily: 'inherit',
                        position: 'absolute',
                        bottom: '75px',
                        right: '14%',
                        width: '66%',
                        resize: 'none',
                    }}
                />
            </div> : (
                <p style={{
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
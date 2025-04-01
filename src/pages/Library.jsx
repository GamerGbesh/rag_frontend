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
                params: {course_id: id},
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
                params: {course_id: index},

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


    return (
        <>
        <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>

            {addLibrary ? <AddCourse id={id}/>
            : (
                <div className="content-area">
                    {!content ?
                    courseData?.map((content, index) => (
                        <ContentCard content={content} key={content.id}/>
                    ))
                    :(
                        <AddContent course_id={courseId} library_id={id} activeFunction={activeFunction}/>
                    )}
                    {courseId !== -1 && data?.active &&
                        <button  className={"submit"}
                                 onClick={handleClick}
                        >
                            {content ? "X" : "Add Document"}
                        </button>}
                </div>
                )
            }

            {courseId !== -1 && courseData.length >= 1 ? <div style={{ width: '300px' }}>
                <AutoResizingTextarea
                    placeholder="Type your message..."
                    minRows={1}
                    maxRows={10}
                    style={{
                        padding: '30px',
                        border: '1px solid #ccc',
                        borderRadius: '20px',
                        fontFamily: 'inherit',
                        position: 'relative',
                        bottom: '50px',
                        right: '85%',
                        width: '250%',
                        resize: 'none',
                    }}
                />
            </div> : (
                <p style={{color:"red", "font-size": "1.250rem"}}>Add documents to be able to use the AI</p>
            )}

        </>
    )
}

export default Library;
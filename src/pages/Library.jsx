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
import ConfirmPopup from "../components/ConfirmPopup.jsx";


function Library() {
    const location = useLocation()
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const {user, status, setStatus,setAddLibrary, addLibrary, content, setContent, setSidebarOpen} = useAuthContext()
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [courseId, setCourseId] = useState(-1);
    const [document, setDocument] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [coursePopup, setCoursePopup] = useState(false);
    const [docId, setDocId] = useState(null);

    useEffect(() => {
        const setting = () => {
            setAddLibrary(false)
            setContent(false)
            setSidebarOpen(true)
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
    }, [id, navigate, status])

    // Async function to get data to display on library page
    const activeFunction = async (course_id) => {
        try {
            const response = await api.get("getDocuments", {
                params: {course_id: course_id, library_id: id},
            })
            setCourseData(response.data)
            setCourseId(course_id);
            console.log(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    const addFunction = () =>{
        setAddLibrary(!addLibrary);

    }

    const headerFunction = () => {
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
        navigate("/quiz", {state: {
            document_id: document,
                library_id: id,
                number_of_questions:
                questionNumber,
        }})
    }


    async function onClick(e) {
        e.preventDefault();
        if (e.target.value === "No"){
            setShowPopup(false)
        }
        else{
            await deleteCourse(courseId);
            setShowPopup(false)
            setCourseId(-1)
        }
    }

    async function onCourseClick(e) {
        e.preventDefault();
        if (e.target.value === "No"){
            setCoursePopup(false)
        }
        else{
            await deleteFunction(docId);
            setCoursePopup(false)
        }
    }

    function custom (id) {
        setDocId(id);
        setCoursePopup(true)
    }

    if (!user){
        return <FirstPage />
    }

    if (courseId === -1) {
        return (
            <>
                <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>
                {addLibrary ? <AddCourse id={id} addFunction={addFunction}/>
                    : (
                        <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950 min-h-[calc(100vh-65px)]">
                            <div className="max-w-4xl mx-auto bg-white dark:bg-blue-900 rounded-xl shadow-md p-6 md:p-8 border border-blue-200 dark:border-blue-700">
                                <div className="text-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500 dark:text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <h2 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-100 mb-2">Welcome to Your Library</h2>
                                    <p className="text-blue-600 dark:text-blue-300">Get started with these instructions</p>
                                </div>

                                <div className="space-y-4 text-blue-700 dark:text-blue-200">
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-800 rounded-lg border border-blue-200 dark:border-blue-700">
                                        <div className="bg-blue-100 dark:bg-blue-700 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Select a course from the side-bar to view its content</p>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-800 rounded-lg border border-blue-200 dark:border-blue-700">
                                        <div className="bg-blue-100 dark:bg-blue-700 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Create a course using the + button if you have no courses</p>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-800 rounded-lg border border-blue-200 dark:border-blue-700">
                                        <div className="bg-blue-100 dark:bg-blue-700 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                        <p>The AI features will be enabled once you upload documents to a course</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
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

            {addLibrary ? <AddCourse id={id} addFunction={addFunction}/>
            : (
                <>
                    {showPopup && <ConfirmPopup onClick={onClick}/>}
                    {coursePopup && <ConfirmPopup text={"Do you want to delete this document"} onClick={onCourseClick}/>}
                    {data?.active && <DeleteButton message={"Delete Course"} onShowPopup={setShowPopup}/>}
                    {document && <Popup onSubmit={onSubmit}/>}
                    <div className="content-area">
                        {!content ?
                        courseData?.data?.map((docs) => (
                            <ContentCard content={docs}
                                         key={docs.id}
                                         quiz={true}
                                         permission={courseData?.permission}
                                         deleteFunction={custom}
                                         makeFunction={makeFunction}
                            />
                        ))
                        :(
                            <AddContent course_id={courseId} library_id={id} activeFunction={activeFunction}/>
                        )}
                        {data?.active &&
                            <button
                                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 
                            ${content ?
                                    'bg-red-500 hover:bg-red-600 text-white' :
                                    'bg-blue-500 hover:bg-blue-600 text-white'
                                }
                                    w-full sm:w-1/3 mx-auto block`}
                                onClick={handleClick}
                                aria-label={content ? "Remove document" : "Add document"}
                            >
                                {content ? (
                                    <>
                                        <span className="sr-only">Remove</span>
                                        <span aria-hidden="true">✕</span>
                                    </>
                                ) : (
                                    "Add Document"
                                )}
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
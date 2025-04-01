import SideBar from "../components/SideBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import FirstPage from "../components/FirstPage.jsx";
import AddCourse from "../components/AddCourse.jsx";
import ContentCard from "../components/ContentCard.jsx";

function Library() {
    const location = useLocation()
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const {user, status, setAddLibrary, addLibrary} = useAuthContext()
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const baseUrl = "http://localhost:8000"



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

    // Todo: Create the delete file function to delete a course file that has been added. Will have to create an api to handle it
    // const deleteFile = async (index) => {
    //     try{
    //         await api.delete("getDocuments", {})
    //     }
    // }

    return (
        <>
            <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>
            {!user ? (
                <FirstPage/>
            ):(
                <>
                    {addLibrary ? <AddCourse id={id}/>
                    : (
                        courseData?.map((course, index) => (
                            <div className={"content-card"}>
                                <a href={baseUrl + course.file} key={index} download>{course.file.split("/")[course.file.split("/").length - 1]}</a>
                                <button >🗑️</button>
                            </div>
                        ))
                        )}
                </>
            )}
        </>
    )
}

export default Library;
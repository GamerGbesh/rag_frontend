import SideBar from "../components/SideBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import FirstPage from "../components/FirstPage.jsx";
import AddCourse from "../components/AddCourse.jsx";

function Library() {
    const location = useLocation()
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const {user, status, setAddLibrary, addLibrary} = useAuthContext()
    const navigate = useNavigate();


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
    const activeFunction = (index) => {
        console.log(index)
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
    return (
        <>
            <SideBar data={data} activeFunction={activeFunction} headerFunction={headerFunction} addFunction={addFunction}/>
            {!user ? (
                <FirstPage/>
            ):(
                <>
                    {addLibrary && <AddCourse id={id}/>}
                </>
            )}
        </>
    )
}

export default Library;
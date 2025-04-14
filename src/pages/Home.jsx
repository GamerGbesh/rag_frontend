import SideBar from "../components/SideBar.jsx";
import {useNavigate} from "react-router-dom";
import api from "../services/api.js";
import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import FirstPage from "../components/FirstPage.jsx";
import CreateLibrary from "../components/CreateLibrary.jsx";
import "../css/home.css"
import "../css/mobile.css"
import Dashboard from "../components/Dashboard.jsx";

export function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [libraryCount, setLibraryCount] = useState(0);
    const { user, status, setAddLibrary, addLibrary, setSidebarOpen } = useAuthContext()

    useEffect(() => {
        const setting = () => {
            setAddLibrary(false)
            setSidebarOpen(false)
        }
        setting();
    }, []);

    useEffect(() => {
        const fetchData = async () => {

                await api.get("/Libraries").then((response) => {
                    setData(response.data);
                    setLibraryCount(response.data.body.length + 1)
                })
                    .catch ((error) => console.log(error))

        }
        fetchData();
    }, [status])


    const activeFunction = (library) => {
        navigate("/Library", {state: {id: library.id}});
    }

    return (
        <>
            <SideBar data={data} activeFunction={activeFunction} disabled={libraryCount >= 3} />
            {!user ? (
                <FirstPage/>
            ):(
                <>
                    {addLibrary ? <CreateLibrary/> : <Dashboard
                        data={data}
                        activeFunction={activeFunction}
                        disabled={libraryCount >= 3}
                        />}
                </>
            )}
        </>
    )
}

export default Home;
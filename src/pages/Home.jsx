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
    const {user, status, setAddLibrary, addLibrary, setSidebarOpen, setRecent} = useAuthContext()

    useEffect(() => {
        const setting = () => {
            setAddLibrary(false)
            setSidebarOpen(false)
        }
        setting();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/Libraries");
                setData(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [status])


    const activeFunction = (library) => {
        setRecent(library)
        navigate("/Library", {state: {id: library.id}});
    }

    return (
        <>
            <SideBar data={data} activeFunction={activeFunction}/>
            {!user ? (
                <FirstPage/>
            ):(
                <>
                    {addLibrary ? <CreateLibrary/> : <Dashboard
                        data={data}
                        activeFunction={activeFunction}
                        />}
                </>
            )}
        </>
    )
}

export default Home;
import SideBar from "../components/SideBar.jsx";
import {useNavigate} from "react-router-dom";
import api from "../services/api.js";
import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import FirstPage from "../components/FirstPage.jsx";
import CreateLibrary from "../components/CreateLibrary.jsx";
import "../css/home.css"
import "../css/mobile.css"

export function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const {user, status, setAddLibrary, addLibrary, setPersonal} = useAuthContext()

    useEffect(() => {
        const setting = () => {
            setAddLibrary(false)
        }
        setting();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/Libraries");
                setData(response.data);
                setPersonal(response.data.body[0].id);

            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [status])

    const addFunction = (e) =>{
        setAddLibrary(!addLibrary);
        if (addLibrary) {
            e.target.innerHTML = "+";
        }
        else {
            e.target.innerHTML = "X"
        }

    }
    const activeFunction = (index) => {
        navigate("/Library", {state: {id: index}});
    }

    return (
        <>
            <SideBar data={data} activeFunction={activeFunction} addFunction={addFunction} />
            {!user ? (
                <FirstPage/>
            ):(
                <>
                    {addLibrary && <CreateLibrary/>}
                </>
            )}
        </>
    )
}

export default Home;
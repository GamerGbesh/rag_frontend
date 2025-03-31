import SideBar from "../components/SideBar.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import FirstPage from "../components/FirstPage.jsx";
import {useAuthContext} from "../contexts/AuthContext.jsx";

function Detail() {
    const location = useLocation();
    const id = location.state?.id
    console.log(id)
    const [data, setData] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("getAdmins", {
                    params: {library_id: id}
                })
                setData(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <SideBar data={data} />
            {!user ? (
                <FirstPage/>
            ):(
                <p>Hello there</p>
            )}
        </>
    )
}

export default Detail;
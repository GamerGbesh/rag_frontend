import SideBar from "../components/SideBar.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import FirstPage from "../components/FirstPage.jsx";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import ContentCard from "../components/ContentCard.jsx";


function Detail() {
    const location = useLocation();
    const id = location.state?.id
    console.log(id)
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("getMembers", {
                    params: {library_id: id}
                })
                setData(response.data)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [update]);


    if (!user) {
        return <FirstPage />;
    }

    async function makeFunction(user_id) {
        await api.post("Admins", {
            library_id: id,
            user_id
        })
            .then(res => {console.log(res); setUpdate(!update);})
            .catch(err => console.log(err))
    }

    async function deleteFunction(user_id) {
        await api.delete("removeMember", {
            data: {
                library_id: id,
                user_id
            }
        })
            .then(res => {console.log(res); setUpdate(!update);})
            .catch(err => console.log(err))
    }

    async function removeFunction(user_id) {
        await api.delete("Admins", {
            data: {
                library_id: id,
                user_id
            }
        })
            .then(res => {console.log(res); setUpdate(!update);})
            .catch(err => console.log(err))
    }

    return (
        <>
            <SideBar data={data} />
            <div className="content-area">
                {data?.members.length > 0 ? (
                    data?.members.map((member, index) => (
                        <ContentCard content={member} key={index}
                                     makeFunction={makeFunction}
                                     deleteFunction={deleteFunction}
                                     removeFunction={removeFunction}
                                     creator={data?.creator}/>
                    ))
                ):(
                    <>
                        {!loading && <p>There are no members in this library</p>}
                    </>
                    )}
                {loading && <p>Loading...</p>}
            </div>
        </>
    )
}

export default Detail;
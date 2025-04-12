import SideBar from "../components/SideBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import FirstPage from "../components/FirstPage.jsx";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import MemberCard from "../components/MemberCard.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import Loader from "../components/Loader.jsx";
import ConfirmPopup from "../components/ConfirmPopup.jsx";


function Detail() {
    const location = useLocation();
    const id = location.state?.id
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const {user, personal, setRecent} = useAuthContext()
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

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
                alert("You are no longer in this library")
                navigate("/")
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

    async function deleteLibrary() {
        await api.delete("deleteLibrary", {
            data: {
                library_id: id
            }
        })
            .then(res => {console.log(res); navigate("/")})
            .catch(err => console.log(err))
    }

    async function leaveLibrary() {
        await api.delete("leaveLibrary", {
            data: {
                library_id: id,
            }
        })
            .then(res => {console.log(res); navigate("/")})
            .catch(err => console.log(err))
    }


    async function onClick (e){
        e.preventDefault();
        if (e.target.value === "No"){
            setShowPopup(false)
        }
        else{
            if (data.creator){
                setRecent(null)
                await deleteLibrary()
            }
            else {
                setRecent(null)
                await leaveLibrary()
            }
        }
    }

    return (
        <>
            <SideBar data={data} />
            {personal !== id &&
                <>
                    {showPopup && data?.creator && <ConfirmPopup text={"Do you want to delete this library"} onClick={onClick}/>}
                    {showPopup && !data?.creator && <ConfirmPopup text={"Do you want to leave this library"} onClick={onClick}/>}
                    {data?.creator ?
                        <DeleteButton onShowPopup={setShowPopup}/>
                        :
                        <DeleteButton message={"Leave Library"} onShowPopup={setShowPopup}/>}
                </>
            }
            <div className="content-area">
                {data?.members.length > 0 ? (
                    data?.members.map((member, index) => (
                        <MemberCard content={member} key={index}
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
                {loading && <Loader text={"Loading..."} />}
            </div>
        </>
    )
}

export default Detail;
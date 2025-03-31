import api from "../services/api.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContext.jsx";

function Logout() {
    const navigate = useNavigate();
    const {logout} = useAuthContext()

    useEffect(() => {
        const logout_user =  () => {
            api.get("auth/logout/")
                .then(r => console.log(r))
                .catch(e => console.log(e));

            navigate("/login");
        }
        logout_user();
        logout()
    }, [])
    return (
        <></>
    )
}

export default Logout;
import {createContext, useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState(true);
    const [addLibrary, setAddLibrary] = useState(false);
    const [content, setContent] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [personal, setPersonal] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setUser(token);
        }
    }, [])

    const login = (data) => {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setUser({token: data.access});
        navigate("/");
    }

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{user, login, logout, status, setStatus,
            addLibrary, setAddLibrary, content, setContent, sidebarOpen, setSidebarOpen, personal, setPersonal}}>
            {children}
        </AuthContext.Provider>
    )
}
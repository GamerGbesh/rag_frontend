import {useState} from "react";
import "../css/signup.css"
import api from "../services/api.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";

function CreateLibrary() {
    const [error, setError] = useState(null);
    const [toggle, setToggle] = useState(true);
    const [library, setLibrary] = useState(null);
    const [description, setDescription] = useState(null);
    const [entryKey, setEntryKey] = useState(null);
    const {setStatus, status, setAddLibrary, addLibrary} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (toggle){
            await api.post("createLibrary", {library_name:library, library_description:description, entry_key:entryKey})
                .then(result => {setError(null); setAddLibrary(!addLibrary);})
                .catch(err => {setError(err.response.data.library_name)});
            setStatus(!status)
        } else {
            await api.post("joinLibrary", {library_name:library, entry_key:entryKey})
                .then(result => {setError(null); setAddLibrary(!addLibrary);})
                .catch(err => {setError(err.response.data.detail || err.response.data.message)});
            setStatus(!status)
        }
    }

    const switcher = (e) => {
        e.preventDefault();
        if (!e.target.className) {
            setToggle(!toggle);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={"toggle"}>
                    <button className={toggle ? "toggle-btn" : undefined} onClick={switcher}>Create Library</button>
                    <button className={!toggle ? "toggle-btn" : undefined} onClick={switcher}>Join Library</button>
                </div>
                {toggle ? <h2>Create Library</h2> : <h2>Join Library</h2>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                    <input type="text" placeholder="Library Name" required onChange={(e) => setLibrary(e.target.value)} />
                    {toggle && <input type="text" placeholder="Library Description"  required onChange={(e) => setDescription(e.target.value)} />}
                    <input type="text" placeholder="Entry Key" required onChange={(e) => setEntryKey(e.target.value)} />
                </div>
                <button type="submit" className={"submit"}>Submit</button>
            </form>
        </>
    )
}

export default CreateLibrary;
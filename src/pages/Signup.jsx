import {Link} from "react-router-dom";
import styles from "../css/signup.module.css"
import {useState} from "react";
import api from "../services/api";
import {useAuthContext} from "../contexts/AuthContext.jsx";

function Signup() {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password2, setPassword2] = useState("");
    const {login} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username) {
            setError("Username is required");
            return
        }
        if (!password) {
            setError("Password is required");
            return
        }
        if (!email) {
            setError("Email is required");
            return
        }
        if (!password2) {
            setError("Password is required");
            return
        }
        if (password !== password2) {
            setError("Passwords do not match");
            return
        }

        //Async function to handle signing up
        try{
            const {data} = await api.post("/auth/signup/", { username, password, email, password2 });
            login(data)
            setError(null);

        } catch (error){
            if (error.response && error.response.data) {
                setError(error.response.data.username);
            } else{
                setError("An error occurred. Please try again.");
            }

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <div className={styles.alert}>{error}</div>}

                <div className={styles.formGroup}>
                <input type="text"
                       placeholder="Username"
                       name={"username"} required
                       onChange={(e) => setUsername(e.target.value)} />
                <input type="email"
                       placeholder={"Email"}
                       name={"email"} required
                       onChange={(e) => setEmail(e.target.value)} />
                <input type="password"
                       placeholder="Password"
                       name={"password1"} required
                       onChange={(e) => setPassword(e.target.value)} />
                <input type="password"
                       placeholder="Verify Password"
                       name={"password2"} required
                       onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <button type="submit" className={styles.submit}>Submit</button>
            </form>
            <span className={"dark:text-white"}>Already have an account? <Link to={"/login"}>Login</Link></span>
        </>
    )
}

export default Signup;
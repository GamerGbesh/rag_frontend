import {Link} from "react-router-dom"
import "../css/navbar.css"
import {useAuthContext} from "../contexts/AuthContext.jsx";

function NavBar() {
    const {user, logout} = useAuthContext()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className={"navbar-brand"}>
                <Link to={"/"}>Synapse</Link>
            </div>
            <div className="navbar-links">
                {user ? (<>
                        <Link to={"logout"}>Logout</Link>
                        <div className="profile-pic"></div>
                    </>
                ) : (
                    <>
                        <Link to={"/signup"}>Sign Up</Link>
                        <Link to={"/login"}>Login</Link>
                    </>
                )}

            </div>

        </nav>
    )
}

export default NavBar;
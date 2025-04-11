import {Link} from "react-router-dom"
import styles from "../css/navbar.module.css"
import {useAuthContext} from "../contexts/AuthContext.jsx";

function NavBar() {
    const {user, sidebarOpen, setSidebarOpen} = useAuthContext()
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <Link to={"/"}>Synapse</Link>
            </div>
            <button
                id="menu-btn"
                className={"mobile-menu-toggle"}
                onClick={()=>{setSidebarOpen(!sidebarOpen)}}
            >
                ☰
            </button>

            <div className={styles.navbarLinks}>
                {user ? (<>
                        <Link to={"logout"}>Logout</Link>
                        {/*<div className="profile-pic"></div>*/}
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
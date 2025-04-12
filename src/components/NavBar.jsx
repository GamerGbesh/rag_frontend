import {Link} from "react-router-dom"
import {useAuthContext} from "../contexts/AuthContext.jsx";

function NavBar() {
    const {user} = useAuthContext()

    return (
        <nav className="flex items-center justify-between z-1000
        fixed p-1 bg-gray-800 text-white w-full top-0 left-0 min-h-16 shadow">
            <div className="text-white text-2xl font-bold transition-all pl-10">
                <Link to={"/"}>Synapse</Link>
            </div>

            <div className="flex items-center gap-6 p-4 font-medium">
                {user ? (<>
                        <Link to={"logout"}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to={"/signup"} className={"hover:bg-gray-600 p-2 rounded-md active:bg-gray-700"}>
                            Sign Up
                        </Link>
                        <Link to={"/login"} className={"hover:bg-gray-600 p-2 rounded-md active:bg-gray-700"}>
                            Login
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar;
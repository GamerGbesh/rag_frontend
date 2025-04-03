import "../css/sidebar.css"
import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";


function SideBar({data, addFunction, activeFunction}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [active, setActive] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const checkLoading = () => {
            if (data) {
                setLoading(false);
                setError(null);
                console.log(data);
            }

        }
        checkLoading();

    }, [data])


    return (<>
        { user &&
        <div className="sidebar">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="side-header">
                        {data?.header.library_name || data?.header}{data?.header_active &&
                            <>
                                 <br/> {!data?.creator ? <Link to={"/library/details"} state={{id:data?.header.id}}>Details</Link>
                                : data?.sub_header && <span style={{"font-size":"14px", "font-style":"italic"}}>Entry key: {data?.sub_header}</span>}
                            </>
                        }
                    </div>

                    <div className="side-body">{
                        data?.body?.map((item, index) => (
                            <p className={`${index} ${index===active ? "active" : ""}`} key={index} onClick={() => {
                                activeFunction(item.id);
                                setActive(index)
                            }}>
                                {item.library_name || item.course_name || item.user.username}
                            </p>
                        ))
                    }

                        {data?.active && <div className="add-more">
                            <button onClick={addFunction} className={"submit"}>
                                +
                            </button>
                        </div>}
                    </div>

                </>
            )}
        </div>
        }
        </>
    )
}

export default SideBar;
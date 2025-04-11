import styles from "../css/sidebar.module.css"
import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";
import SideCard from "./SideCard.jsx";


function SideBar({data, addFunction, activeFunction}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user, sidebarOpen, setPersonal} = useAuthContext()
    const [active, setActive] = useState(null);


    useEffect(() => {
        const checkLoading = () => {
            if (data) {
                setLoading(false);
                setError(null);
                console.log(data);
                if (data.user){
                    setPersonal(data.user.id);
                }
            }
        }
        checkLoading();

    }, [data])


    return (<>
        { user &&
        <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ""}`}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.sideHeader}>
                        {data?.header.library_name || data?.header}{data?.header_active &&
                            <>
                                 <br/> {!data?.creator ?
                                <Link to={"/library/details"} state={{id:data?.header.id}}>Details</Link>
                                : data?.sub_header && <span
                                style={{"font-size":"14px", "font-style":"italic"}}
                            >
                                Entry key: {data?.sub_header}
                                </span>}
                            </>
                        }
                    </div>

                    <div className={styles.sideBody}>{
                        <>
                            <>
                                {data?.user && <SideCard activeFunction={activeFunction} item={data?.user}/>}
                            </>
                            {data?.body?.map((item, index) => (
                                <SideCard item={item}
                                          key={index}
                                          activeFunction={activeFunction}
                                          index={index}
                                          setActive={setActive}
                                          active={active}
                                />
                            ))}
                        </>
                    }

                        {data?.active && <div className={styles.addMore}>
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
import {useState} from "react";

function SideCard({item, index, activeFunction, active, setActive}) {

    return (
        <p className={`${index} ${index===active ? "active" : ""}`} key={index} onClick={() => {
            activeFunction(item.id);
            setActive(index)
        }}>
            {item.library_name || item.course_name || item.user.username}
        </p>
    )
}

export default SideCard;
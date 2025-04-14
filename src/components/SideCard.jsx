import styles from "../css/sidecard.module.css"

function SideCard({item, id, index, activeFunction, active, setActive}) {

    return (
        <p className={`${index===active ? styles.active : ""} 
        px-4 py-3 bg-white/10 rounded-md cursor-pointer transition-all hover:bg-white/20 
        hover:translate-x-1  active:font-semibold`}
           key={index} onClick={() => {
            activeFunction(item);
            setActive(index)
        }}
        >
            {item.library_name || item.course_name || item.user.username}
        </p>
    )
}

export default SideCard;
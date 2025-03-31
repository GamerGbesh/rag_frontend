import "../css/membercard.css"

function MemberCard({member}) {
    return (
        <div className={`member-card ${member.position}`}>
            <div className="member-pic">
                <img src="one" alt={member.name} />
            </div>
            <div className="member-name">
                {member.name}
            </div>
            <div className="action_btn">
                <button>
                    Action
                </button>
            </div>
        </div>
    )
}

export default MemberCard;
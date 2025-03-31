import "../css/coursecard.css"

function CourseCard({course}) {
    return (
        <div className="course-card">
            <div className="course-name">
                {course.name}
            </div>
            <div className="course-description">{course.description}</div>
        </div>
    )
}

export default CourseCard;
function Task({ task }) {

    let date = new Date(task.createdAt)

    return (
        <div>
            <h3>{task.title}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{task.description}</p>
            <p>{task.project}</p>
        </div>
    )
}

export default Task
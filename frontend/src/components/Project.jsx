function Project({ project }) {

    let date = new Date(project.createdAt)

    return (
        <div>
            <h3>{project.name}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{project.description}</p>
            <p>{project.user}</p>
        </div>
    )
}

export default Project
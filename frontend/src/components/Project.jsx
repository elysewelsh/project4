import { Link } from 'react-router-dom'

function Project({ project }) {

    let date = new Date(project.createdAt)
    // let projectUrl = `/${project._id}/tasks`

    // console.log(projectUrl)

    console.log("This is the project ID:", project._id)


    return (
        <div>
            <Link to={'/ProjectDetails/'+ project._id}>{project.name}</Link>
            <h3>{project.name}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{project.description}</p>
            <p>{project.user}</p>
        </div>
    )
}

export default Project
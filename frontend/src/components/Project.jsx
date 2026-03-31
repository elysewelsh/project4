import { Link } from 'react-router-dom'
import { projectClient } from '../clients/api.js'

function Project({ project, setProjects=[] }) {

    let date = new Date(project.createdAt)

    console.log("This is the project ID:", project._id)

    const handleDelete = async () => {
        try {
// removing project from database
        await projectClient.delete(`${project._id}`)
// removing post from state
        setProjects(projects => projects.filter(p => p._id !== project._id))
        }
        catch (err) {
            console.error(err)
            alert(err.response.data.message)
        }
    }

    const handleEdit = async () => {
        await projectClient
    }

    return (
        <div>
            <Link to={'/ProjectDetails/'+ project._id}>{project.name}</Link>
            <h3>{project.name}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{project.description}</p>
            <p>{project.user}</p>
            <button onClick={handleDelete}>X</button>
            <button onClick={handleEdit}>Edit</button>
        </div>
    )
}

export default Project
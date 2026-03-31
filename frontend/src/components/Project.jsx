import { Link } from 'react-router-dom'
import { projectClient } from '../clients/api.js'
import { useState } from 'react'

function Project({ project, projects={}, setProjects=[], canEdit=true}) {

    let date = new Date(project.createdAt)

    const [editing, setEditing] = useState(false)

    const [name, setName] = useState('')
    
    const [description, setDescription] = useState('')

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
        setName(project.name)
        setDescription(project.description)
        setEditing(true)       
    }

    const handleSubmit = async (e) => {
            e.preventDefault()
            try {
// make a put request to update the post based off the state (title, body)
            const { data } = await projectClient.put(`/${project._id}`, { name, description})
// map over projects state to update new fields in form for project that matches project in view
            const updatedProjects = projects.map(p => p._id === project._id ? data : p)
            setProjects(updatedProjects)
// reset the form
                setName('')
                setDescription('')
                setEditing(false)
            }
            catch (err) {
                console.error(err)
            }
        }

    return (
        <div>
            <Link to={'/ProjectDetails/'+ project._id}>{project.name}</Link>
            <h3>{project.name}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{project.description}</p>
            <p>{project.user}</p>
            {canEdit &&
                <>
                <button onClick={handleDelete}>X</button>
                <button onClick={handleEdit}>Edit</button>
                </>
            }
            <>
            {editing ?
            <form onSubmit={handleSubmit}>
                <h2>Edit Project</h2>
                <label htmlFor="name">Project Name:</label>
                <input 
                    type="text" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}>
                </input>
                <label htmlFor="description">Project Description:</label>
                <textarea
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}>
                </textarea>
                <button>Submit</button>
            </form>
            :
            <></>
            }
            </>
        </div>
    )
}

export default Project
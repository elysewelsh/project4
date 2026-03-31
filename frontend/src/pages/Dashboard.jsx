import { useEffect, useState } from 'react'
import { projectClient } from '../clients/api.js'
import Project from '../components/Project.jsx'

function Dashboard() {

const [projects, setProjects] = useState([])

const [name, setName] = useState('')

const [description, setDescription] = useState('')

useEffect(() => {
    async function getData() {
        try {
// get our posts from database
        const { data } = await projectClient.get('/')
        // const posts = response.data
// save that in component's/local state variable
        setProjects(data)
        }
        catch (err) {
            console.error(err.response.data)
            alert(err.message)
        }
    }
    getData()
}, [])

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
// make a post request to create the post based off the state (title, body)
        const { data } = await projectClient.post('/', { name, description })

// add the new project to the state
        setProjects([...projects, data])
// reset the form
        setName('')
        setDescription('')
    }
    catch (err) {
        console.error(err)
    }
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add a Project Here</h2>
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
            <h1>Dashboard</h1>
            {projects.map(project => <Project key={project._id} project={project} setProjects={setProjects}/>)}
        </div>
    )
}

export default Dashboard
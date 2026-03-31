import { useEffect, useState } from 'react'
import { taskClient, projectClient } from '../clients/api.js'
import { useParams } from 'react-router'
// import { useNavigate } from 'react-router-dom'
import Project from '../components/Project.jsx'
import Task from '../components/Task.jsx'

function ProjectDetails() {

let params = useParams()

const [project, setProject] = useState('')

const [tasks, setTasks] = useState([])

const [title, setTitle] = useState('')

const [description, setDescription] = useState('')

// const navigate = useNavigate()

useEffect(() => {
    async function getData() {
        try {
            if (params.projectId === "undefined") {
                return
            }
        const project = await projectClient.get('/' + params.projectId)
        setProject(project.data)
// get our tasks from database
        const { data } = await projectClient.get('/'+ params.projectId + '/tasks')
        // const posts = response.data
// save that in component's/local state variable
        setTasks(data)
        }
        catch (err) {
            console.error(err.response.data.message)
            // alert(err.response.data.message)
            // navigate('/dashboard')
        }
    }
    getData()
}, [])

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
// make a post request to create the task based off the state (title, body)
        const { data } = await taskClient.post('/' + params.projectId + '/tasks', { title, description })

// add the new task to the state
        setTasks([...tasks, data])
// reset the form
        setTitle('')
        setDescription('')
    }
    catch (err) {
        console.error(err)
    }
}

    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <h2>Add a Task Here</h2>
                    <label htmlFor="title">Task:</label>
                    <input 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required={true}>
                    </input>
                    <label htmlFor="description">Task Description:</label>
                    <textarea
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}>
                    </textarea>
                    <button>Submit</button>
                </form>
                <h1>Project Details</h1>
                <>{params.projectId !== "undefined"
                ?
                    <>
                        <Project project={project} canEdit={false}/>
                        {tasks.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                    </>
                :
                    <></>
                }
                </>
        </div>
    )
}

export default ProjectDetails
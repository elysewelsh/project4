import { useEffect, useState } from 'react'
import { taskClient, projectClient } from '../clients/api.js'
import { useParams } from 'react-router'
import Project from '../components/Project.jsx'
import Task from '../components/Task.jsx'
import useWindowSize from '../hook/useWindowSize.js'

function ProjectDetails() {

let params = useParams()

const [project, setProject] = useState('')

const [tasks, setTasks] = useState([])

const [pending, setPending] = useState([])

const [inProgress, setInProgress] = useState([])

const [completed, setCompleted] = useState([])

const [title, setTitle] = useState('')

const [description, setDescription] = useState('')

const dimensions = useWindowSize();
let kanban;
    if (dimensions.width >= 768) {
        kanban = true;
    } else {
        kanban = false;
    }

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
// save that in component's/local state variable
        setTasks(data)
        }
        catch (err) {
            console.error(err.response.data.message)
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

useEffect(() => {
    setPending(tasks.filter((task) => task.status === "Pending"))
    setInProgress(tasks.filter((task) => task.status === "In-Progress"))
    setCompleted(tasks.filter((task) => task.status === "Completed"))
},[tasks])


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
                <>
                    {params.projectId !== "undefined"
                    ?
                        <>
                            <Project project={project} canEdit={false} isLink={false}/>
                            <h2>Tasks for {project.name}</h2>
                            <>
                            {kanban
                            ?
                            <div>
                                <div>
                                    <h3>Pending Tasks</h3>
                                    <div>
                                        {pending.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                </div>
                                <div>
                                    <h3>Tasks In-Progress</h3>
                                    <div>
                                        {inProgress.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                </div>
                                <div>
                                    <h3>Completed Tasks</h3>
                                    <div>
                                        {completed.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                {tasks.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                            </div>
                            }
                            </>
                        </>
                    :
                        <></>
                }
                </>
        </div>
    )
}

export default ProjectDetails
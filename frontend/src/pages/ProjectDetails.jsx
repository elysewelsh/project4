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

const totalTasks = tasks.length;
const pendingTasks = pending.length;
const inProgressTasks = inProgress.length;
const completedTasks = completed.length;

const pendingBar = (pendingTasks/totalTasks)*100
const inProgressBar = (inProgressTasks/totalTasks)*100
const completedBar = (completedTasks/totalTasks)*100


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
                <>
                    {params.projectId !== "undefined"
                    ?
                        <>
                            <Project project={project} canEdit={false} isLink={false}/>
                            <div className="m-4 p-4 gap-3 border-1 rounded-xl">
                                Project Progress: {completedBar}% Complete
                                <div className="flex flex-row w-full border-1">
                                                                        {completedBar > 0 ?
                                    <div style={{ width: `${completedBar}%` }} className="bg-gray-700 p-2">
                                        Completed
                                    </div>
                                    :
                                    <></>
                                    }
                                    {inProgressBar > 0 ?
                                    <div style={{ width: `${inProgressBar}%` }} className="bg-gray-500 p-2">
                                        In-Progress
                                    </div>
                                    :
                                    <></>
                                    }
                                    {pendingBar > 0 ?
                                    <div style={{ width: `${pendingBar}%` }} className="bg-gray-400 p-2">
                                        Pending
                                    </div>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                            <h2 className="text-center font-bold text-4xl mt-5 mb-10">Tasks for {project.name}</h2>
                            <div className="w-full flex flex-row justify-around">
                            {kanban
                            ?
                            <div className="w-full flex flex-row justify-center">
                                <div className="flex flex-col gap-5 px-[5%]">
                                    <h3 className="text-center font-bold text-2xl">Pending Tasks</h3>
                                    <div className="flex flex-col gap-5">
                                        {pending.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                </div>
                                <div className="border-1"></div>
                                <div className="flex flex-col gap-5 px-[5%]">
                                    <h3 className="text-center font-bold text-2xl">Tasks In-Progress</h3>
                                    <div className="flex flex-col gap-5 ">
                                        {inProgress.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                </div>
                                <div className="border-1"></div>
                                <div className="flex flex-col gap-5 px-[5%]">
                                    <h3 className="text-center font-bold text-2xl">Completed Tasks</h3>
                                    <div className="flex flex-col gap-5">
                                        {completed.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                {tasks.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                            </div>
                            }
                            </div>
                        </>
                    :
                        <></>
                }
                </>
        </div>
    )
}

export default ProjectDetails
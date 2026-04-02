import { useEffect, useState } from 'react'
import { taskClient, projectClient } from '../clients/api.js'
import { useParams } from 'react-router'
import Project from '../components/Project.jsx'
import Task from '../components/Task.jsx'
import useWindowSize from '../hooks/useWindowSize.js'

function ProjectDetails() {

    let params = useParams()

    const [project, setProject] = useState('')

    const [tasks, setTasks] = useState([])

    const [pending, setPending] = useState([])

    const [inProgress, setInProgress] = useState([])

    const [completed, setCompleted] = useState([])

    const [title, setTitle] = useState('')

    const [description, setDescription] = useState('')

    const [adding, setAdding] = useState(false)

    const [noError, setNoError] = useState(true)

    const [errorMessage, setErrorMessage] = useState('')

    const dimensions = useWindowSize();
    let kanban;
        if (dimensions.width >= 900) {
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
            setNoError(true)
            setErrorMessage('')
            const project = await projectClient.get('/' + params.projectId)
            setProject(project.data)
    // get our tasks from database
            const { data } = await projectClient.get('/'+ params.projectId + '/tasks')
    // save that in component's/local state variable
            setTasks(data)
            }
            catch (err) {            
                console.error(err.response.data.message)
                setNoError(false)
                setErrorMessage(err.response.data.message)
            }
        }
        getData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
    // make a post request to create the task based off the state (title, body)
            setNoError(true)
            setErrorMessage('')
            const { data } = await taskClient.post('/' + params.projectId + '/tasks', { title, description })
    // add the new task to the state
            setTasks([...tasks, data])
    // reset the form
            setTitle('')
            setDescription('')
            setAdding(false)
        }
        catch (err) {
            console.error(err.response.data.message)
            setNoError(false)
            setErrorMessage(err.response.data.message)
        }
    }

    useEffect(() => {
        setPending(tasks.filter((task) => task.status === "Pending"))
        setInProgress(tasks.filter((task) => task.status === "In-Progress"))
        setCompleted(tasks.filter((task) => task.status === "Completed"))
    },[tasks])

    const handleAdd = async () => {
        setAdding(true)       
    }

    const handleCancel = async () => {
        setAdding(false)
    }

    const totalTasks = tasks.length;
    const pendingTasks = pending.length;
    const inProgressTasks = inProgress.length;
    const completedTasks = completed.length;

    const pendingBar = (pendingTasks/totalTasks)*100
    const inProgressBar = (inProgressTasks/totalTasks)*100
    const completedBar = (completedTasks/totalTasks)*100

    const bar = (Number(pendingTasks) + Number(inProgressTasks) + Number(completedTasks))


    return (
        <div className="m-10 p-5">
            <>
                {noError ?
                    <>
                    {params.projectId !== "undefined" ?
                        <>
                            <Project project={project} canEdit={false} isLink={false}/>
                            <>
                                {bar > 0 ?
                                    <div className="mt-4 p-4 gap-3 border-1 rounded-xl">
                                        <p className="mb-3 ml-1"><span className="font-medium">Project Progress: </span><span>{completedBar.toFixed()}% Complete</span></p>
                                        <div className="flex flex-row w-full border-1">
                                            {completedBar > 0 ?
                                                <div style={{ width: `${completedBar}%` }} className="bg-gray-700 text-white p-2">
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
                                :
                                    <></>
                                }
                            </>
                            <h2 className="text-center font-bold text-4xl mt-5 mb-10">Tasks for {project.name}</h2>
                            <>
                                {adding ?
                                    <div className="md:mx-[30%] mb-10">
                                    <form 
                                    className="flex flex-col border-1 rounded-xl p-2 mt-3 bg-gray-200"
                                    onSubmit={handleSubmit}>
                                            <div className="flex flex-row justify-end">
                                                <button className="font-medium bg-gray-300 rounded-full px-2 border-1 cursor-pointer" onClick={handleCancel}>X</button>
                                            </div>
                                        <label className="font-medium" htmlFor="title">Title:</label>
                                        <input 
                                            className="bg-white ml-2 rounded-md p-1 px-2 cursor-pointer border-1 border-gray-400"
                                            type="text" 
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required={true}>
                                        </input>
                                        <label className="font-medium" htmlFor="description">Description:</label>
                                        <textarea
                                            className="bg-white ml-2 rounded-md p-1 px-2 cursor-pointer border-1 border-gray-400"
                                            type="text"
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required={true}>
                                        </textarea>
                                        <button className="mt-3 w-[50%] border-1 rounded-md self-center bg-gray-300 font-medium cursor-pointer">Submit</button>
                                    </form>
                                    </div>
                                :
                                    <div className="flex flex-row justify-end mt-3">  
                                        <button className="text-gray-500 underline underline-offset-4 cursor-pointer" onClick={handleAdd}>Add Task</button>   
                                    </div>
                                }
                            </>
                            <div className="w-full flex flex-row justify-around">
                                {kanban ?
                                    <div className="w-full flex flex-row justify-center">
                                        <div className="flex flex-col gap-5 px-[5%]">
                                            <h3 className="text-center font-bold text-2xl">Pending</h3>
                                            <div className="flex flex-col gap-5">
                                                {pending.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                            </div>
                                        </div>
                                        <div className="border-1"></div>
                                        <div className="flex flex-col gap-5 px-[5%]">
                                            <h3 className="text-center font-bold text-2xl">In-Progress</h3>
                                            <div className="flex flex-col gap-5 ">
                                                {inProgress.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                            </div>
                                        </div>
                                        <div className="border-1"></div>
                                        <div className="flex flex-col gap-5 px-[5%]">
                                            <h3 className="text-center font-bold text-2xl">Completed</h3>
                                            <div className="flex flex-col gap-5">
                                                {completed.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className="flex flex-col gap-5 mt-10">
                                        {tasks.map(task => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks}/>)}
                                    </div>
                                }
                            </div>
                        </>
                    :
                        <></>
                    }
                    </>
                :
                    <span>{errorMessage}</span>
                }
            </>
        </div>
    )
}

export default ProjectDetails
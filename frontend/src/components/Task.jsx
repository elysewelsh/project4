import { useState } from 'react'
import { taskClient } from '../clients/api.js'

function Task({ task, tasks, setTasks }) {

    let date = new Date(task.createdAt)

        const [editing, setEditing] = useState(false)
    
        const [title, setTitle] = useState('')
        
        const [description, setDescription] = useState('')
    
        const handleDelete = async () => {
            try {
    // removing task from database
            await taskClient.delete(`tasks/${task._id}`)
    // removing task from state
            setTasks(tasks => tasks.filter(t => t._id !== task._id))
            }
            catch (err) {
                console.error(err)
                alert(err.response.data.message)
            }
        }
    
        const handleEdit = async () => {
            setTitle(task.title)
            setDescription(task.description)
            // setStatus(task.status)
            setEditing(true)       
        }

        const handleStatusChange = async (taskId, newStatus) => {
        const { data } = await taskClient.put('/tasks/'+taskId, { status: newStatus })
        const updatedTasks = tasks.map(task => task._id === data._id ? {...task, status: data.status } : task )
        setTasks(updatedTasks)
        }
    
        const handleSubmit = async (e) => {
                e.preventDefault()
                try {
    // make a put request to update the post based off the state (title, body)
                const { data } = await taskClient.put(`tasks/${task._id}`, { title, description })
    // map over projects state to update new fields in form for project that matches project in view
                const updatedTasks = tasks.map(t => t._id === task._id ? data : t)
                setTasks(updatedTasks)
    // reset the form
                    setTitle('')
                    setDescription('')
                    setEditing(false)
                }
                catch (err) {
                    console.error(err)
                }
            }

    return (
        <div className="bg-gray-200 p-5 border-1 rounded-xl">
            <h3 className="font-bold text-lg mb-2">{task.title}</h3>
            <p><span className="font-medium">Date Created: </span><span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span></p>
            <p><span className="font-medium">Task Description: </span><span>{task.description}</span></p>
            {/* <p><span className="font-medium">Current Status: </span><span>{task.status}</span></p> */}
            <div className="flex flex-row">
                <p className="font-medium">Status: </p>
                    <select
                    className="bg-white ml-2 rounded-md p-[1%] cursor-pointer"
                    id="status"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, (e.target.value))}>
                        {/* <option value=''></option> */}
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="In-Progress">In-Progress</option>
                    </select>
            </div>
            {/* <p>{task.project}</p> */}
            <div className="flex flex-row justify-between mt-4">  
                <button className="text-gray-500 cursor-pointer" onClick={handleEdit}>Edit Task</button>          
                <button className="font-medium bg-gray-300 rounded-full px-2 border-1 cursor-pointer" onClick={handleDelete}>X</button>
            </div>

            <>
            {editing ?
            <form onSubmit={handleSubmit}>
                <h2>Edit Task</h2>
                <label htmlFor="title">Task Title:</label>
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
            :
            <></>
            }
            </>
        </div>
    )
}

export default Task
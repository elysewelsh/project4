import { useState } from 'react'
import { taskClient } from '../clients/api.js'

function Task({ task, tasks, setTasks }) {

    let date = new Date(task.createdAt)

        const [editing, setEditing] = useState(false)
    
        const [title, setTitle] = useState('')
        
        const [description, setDescription] = useState('')

        const [noError, setNoError] = useState(true)

        const [errorMessage, setErrorMessage] = useState('')

        const [loading, setLoading] = useState(false)
    
        const handleDelete = async () => {
            try {
                setNoError(true)
                setErrorMessage('')
                setLoading(true)
    // removing task from database
                const { data } = await taskClient.delete(`tasks/${task._id}`)
    // removing task from state
                setTasks(tasks => tasks.filter(t => t._id !== task._id))
                alert(data.message)
            }
            catch (err) {
                console.error(err.response.data.message)
                setNoError(false)
                setErrorMessage(err.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
    
        const handleEdit = async () => {
            setTitle(task.title)
            setDescription(task.description)
            setEditing(true)       
        }

        const handleCancel = async () => {
            setEditing(false)
        }

        const handleStatusChange = async (taskId, newStatus) => {
            try {
                setNoError(true)
                setErrorMessage('')
                setLoading(true)
                const { data } = await taskClient.put('/tasks/'+taskId, { status: newStatus })
                const updatedTasks = tasks.map(task => task._id === data._id ? {...task, status: data.status } : task )
                setTasks(updatedTasks)
            }
            catch (err) {
                console.error(err.response.data.message)
                setNoError(false)
                setErrorMessage(err.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                setNoError(true)
                setErrorMessage('')
                setLoading(true)
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
                console.error(err.response.data.message)
                setNoError(false)
                setErrorMessage(err.response.data.message)
            }
            finally {
                    setLoading(false)
            }
        }

    return (
        <div className="bg-gray-200 p-5 border-1 rounded-xl">
            <div className="mt-5 font-medium text-blue-500 text-center text-lg">
                {noError ?
                    <></>
                :
                    <span>{errorMessage}</span>
                }
            </div>
            <div className="mt-5 font-medium text-blue-500 text-center text-lg">
                {loading?
                    <span>Please wait...</span>
                :
                    <></>
                }
            </div>
            <div className="flex flex-row justify-between mb-3">
                <h3 className="self-baseline font-bold text-lg mt-2">{task.title}</h3>
                <button className="font-medium bg-gray-300 rounded-full px-3 border-1 cursor-pointer" onClick={handleDelete}>X</button>
            </div>
            <p><span className="font-medium">Created: </span><span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span></p>
            <p><span className="font-medium">Description: </span><span>{task.description}</span></p>
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
            <div>
                {editing ?
                    <form 
                    className="flex flex-col border-1 rounded-md p-2 mt-3 bg-gray-100"
                    onSubmit={handleSubmit}>
                            <div className="flex flex-row justify-end">
                                <button className="font-medium bg-gray-300 rounded-full px-2 border-1 cursor-pointer" onClick={handleCancel}>X</button>
                            </div>
                        <label className="font-medium" htmlFor="title">New Title:</label>
                        <input 
                            className="bg-white ml-2 rounded-md p-1 px-2 cursor-pointer border-1 border-gray-300"
                            type="text" 
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}>
                        </input>
                        <label className="font-medium" htmlFor="description">New Description:</label>
                        <textarea
                            className="bg-white ml-2 rounded-md p-1 px-2 cursor-pointer border-1 border-gray-300"
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required={true}>
                        </textarea>
                        <button className="mt-3 w-[50%] border-1 rounded-md self-center bg-gray-300 font-medium cursor-pointer">Submit</button>
                    </form>
                :
                    <div className="flex flex-row justify-end mt-3">  
                        <button className="text-gray-500 underline underline-offset-4 cursor-pointer" onClick={handleEdit}>Edit Task</button>   
                    </div>
                }
            </div>
        </div>
    )
}

export default Task
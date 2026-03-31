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
            setEditing(true)       
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
        <div>
            <h3>{task.title}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{task.description}</p>
            <p>{task.project}</p>
            <button onClick={handleDelete}>X</button>
            <button onClick={handleEdit}>Edit</button>
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
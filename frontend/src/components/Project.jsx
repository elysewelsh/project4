import { Link } from 'react-router-dom'
import { projectClient } from '../clients/api.js'
import { useState } from 'react'

function Project({ project, projects={}, setProjects=[], canEdit=true, isLink=true}) {

    let date = new Date(project.createdAt)

    const [editing, setEditing] = useState(false)

    const [name, setName] = useState('')
    
    const [description, setDescription] = useState('')

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

    function handleEdit () {
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

    const handleCancel = async () => {
        setEditing(false)
    }

    return (
        <div className="bg-gray-200 p-5 border-1 rounded-xl">
            <div className="flex flex-row justify-between mb-3">
                {isLink ?
                <Link className="self-baseline font-bold underline underline-offset-4 text-lg mt-2" to={'/ProjectDetails/'+ project._id}>{project.name}</Link>
                :
                <h3 className="self-baseline font-bold text-lg mt-2">{project.name}</h3>
                }
                <>
                    {canEdit &&
                    <button className="font-medium bg-gray-300 rounded-full px-3 border-1 cursor-pointer" onClick={handleDelete}>X</button>
                    }
                </>
            </div>

            <p><span className="font-medium">Created: </span><span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span></p>
            <p><span className="font-medium">Description: </span><span>{project.description}</span></p>
            <>
            {editing ?
                <form 
                className="flex flex-col border-1 rounded-md p-2 mt-3 bg-gray-100"
                onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-end">
                        <button className="font-medium bg-gray-300 rounded-full px-2 border-1 cursor-pointer" onClick={handleCancel}>X</button>
                    </div>
                    <label className="font-medium" htmlFor="title">New Name:</label>
                    <input 
                        className="bg-white ml-2 rounded-md p-1 px-2 cursor-pointer border-1 border-gray-300"
                        type="text" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
            <>
                {canEdit &&
                    <div className="flex flex-row justify-end mt-3">  
                        <button className="text-gray-500 underline underline-offset-4 cursor-pointer" onClick={handleEdit}>Edit Project</button>   
                    </div>
                }
            </>
            }
    
            </>
        </div>
    )
}

export default Project
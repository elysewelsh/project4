import { useEffect, useState } from 'react'
import { projectClient } from '../clients/api.js'
import Project from '../components/Project.jsx'

function Dashboard() {


const [projects, setProjects] = useState([])

const [name, setName] = useState('')

const [description, setDescription] = useState('')

const [adding, setAdding] = useState(false)

const [noError, setNoError] = useState(true)

const [errorMessage, setErrorMessage] = useState('')

useEffect(() => {
    async function getData() {
        try {
        setNoError(true)
        setErrorMessage('')
// get our posts from database
        const { data } = await projectClient.get('/')
// save that in component's/local state variable
        setProjects(data)
        }
        catch (err) {
            console.error(err.response.data.message)
            setNoError(false)
            setErrorMessage(err.response.data.message)
        }
    }
    getData()
}, [])

const handleAdd = async () => {
    setAdding(true)       
}

const handleCancel = async () => {
    setAdding(false)
}

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setNoError(true)
// make a post request to create the post based off the state (title, body)
        const { data } = await projectClient.post('/', { name, description })
// add the new project to the state
        setProjects([...projects, data])
// reset the form
        setName('')
        setDescription('')
        setAdding(false)
    }
    catch (err) {
            console.error(err.response.data.message)
            setNoError(false)
            setErrorMessage(err.response.data.message)
    }
}

    return (

        <div className="m-10 md:m-20">
            <h1 className="text-center font-bold text-3xl mt-5 mb-10">Your Projects</h1>
            {noError ?
                <>
                    {adding ?
                        <div className="md:mx-[30%] mb-10">
                            <form 
                            className="flex flex-col border-1 rounded-xl p-2 mt-3 bg-gray-200"
                            onSubmit={handleSubmit}>
                                <div className="flex flex-row justify-end">
                                    <button className="font-medium bg-gray-300 rounded-full px-2 border-1 cursor-pointer" onClick={handleCancel}>X</button>
                                </div>
                                <label className="font-medium" htmlFor="title">Name:</label>
                                <input 
                                    className="bg-white ml-2 rounded-md p-1 px-2 cursor-pointer border-1 border-gray-400"
                                    type="text" 
                                    id="title"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                            <button className="text-gray-500 underline underline-offset-4 cursor-pointer" onClick={handleAdd}>Add Project</button>   
                        </div>
                    }
                    <div className="flex flex-col gap-5 mt-5">
                        {projects.map(project => <Project key={project._id} project={project} projects={projects} setProjects={setProjects} canEdit={true}/>)}
                    </div>
                </>
            :
                <span>{errorMessage}</span>
            }
        </div>
    )
}

export default Dashboard
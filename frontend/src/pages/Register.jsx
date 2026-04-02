import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userClient } from '../clients/api.js'
import { useUser } from '../context/UserContext.jsx'

function Register() {

// bring in setter function from the context
    const { setUser } = useUser()

    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [noError, setNoError] = useState(true)

    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setNoError(true)
            setErrorMessage('')
// send form data to our backend
            const { data } = await userClient.post('/register', form)
// take the token and store it locally in localStorage
            localStorage.setItem("token", data.token)
// save some user data in our state
            setUser(data.user)
// take the user to a different page
            navigate("/dashboard")
        }
        catch (err) {
            console.error(err.response.data.message)
            setNoError(false)
            setErrorMessage(err.response.data.message)
        }  
    }

    return (
        <div className="m-10">
            <div className="mt-5 font-medium text-red-500 text-center text-lg">
                {noError?
                    <></>
                :
                    <span>{errorMessage}</span>
                }
            </div>
            <form 
            className="flex flex-col gap-3 mt-10 border-1 rounded-xl p-5 bg-gray-300"
            onSubmit={handleSubmit}>
                <label className="font-medium" htmlFor="username">username:</label>
                <input 
                    className="bg-white ml-2 rounded-md p-1 px-2 border-1 border-gray-400"
                    value={form.username}
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    required
                />
                
                <label className="font-medium" htmlFor="email">email:</label>
                <input
                    className="bg-white ml-2 rounded-md p-1 px-2 border-1 border-gray-400"
                    value={form.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="text"
                    required 
                />
                
                <label className="font-medium" htmlFor="password">password:</label>
                <input
                    className="bg-white ml-2 rounded-md p-1 px-2 border-1 border-gray-400"
                    value={form.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required
                />

                <button className="mt-3 w-[10%] border-1 rounded-md self-center bg-gray-400 font-medium cursor-pointer">Register</button>
            </form>
        </div>
    )
}

export default Register
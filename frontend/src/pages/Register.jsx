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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(form)

        
        try {
// send form data to our backend
            const { data } = await userClient.post('/register', form)
            console.log(data)
// take the token and store it locally in localStorage
            localStorage.setItem("token", data.token)
// save some user data in our state
            setUser(data.user)
// take the user to a different page
            navigate("/dashboard")
        }
        catch (err) {
            console.error(err)
            alert(err.response.data.message)
        }
        
    }

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username:</label>
                <input 
                    value={form.username}
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    required
                />
                
                <label htmlFor="email">email:</label>
                <input
                    value={form.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="text"
                    required 
                />
                
                <label htmlFor="password">password:</label>
                <input
                    value={form.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required
                />

                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

function Navbar() {

// bring in user info from context
    const { user, logout } = useUser()

    return (
        <nav className="sticky top-0 m-0 mb-5 border-b-1 border-gray-400 bg-gray-200 py-5 px-10">
            <div className="flex flex-row justify-between">
                <h1 className="flex flex-col justify-center font-bold text-4xl">Pro-Tasker</h1>
                <ul className="flex flex-col gap-2">
                    {user 
                        ?
                            <div>
                                <li className="underline underline-offset-4 cursor-pointer"><Link to="/dashboard">Dashboard</Link></li>
                                <li className="underline underline-offset-4 cursor-pointer" onClick={logout}><Link to="/login">Logout</Link></li>
                            </div>
                        :
                            <>
                                <li className="underline underline-offset-4 cursor-pointer"><Link to="/login">Login</Link></li>
                                <li className="underline underline-offset-4 cursor-pointer"><Link to="/register">Register</Link></li>
                            </>
                    }
                </ul>
            </div>
            {user && 
                <h1 className="font-medium text-lg">Welcome, {user.username}!</h1>
            }
        </nav>
    )
}

export default Navbar
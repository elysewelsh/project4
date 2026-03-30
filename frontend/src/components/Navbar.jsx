import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

function Navbar() {

// bring in user info from context
    const { user, logout } = useUser()

    return (
        <nav>
            {user 
                && 
                    <h1>Welcome, {user.username}!</h1>
            }
            <ul>
                {user 
                    ?
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li onClick={logout}><Link to="/login">Logout</Link></li>
                        </>
                    :
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default Navbar
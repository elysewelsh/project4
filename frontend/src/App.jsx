import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import { useUser } from './context/UserContext.jsx'

function App() {

    const { user } = useUser()

    return (
        <>
            <Navbar />
            {user
                ? 
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                :
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login"/>} />
                    </Routes>
            }
        </>
    )
}

export default App

import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { token, userClient } from '../clients/api.js'

const UserContext = createContext(null)

// check if there's a token, if so: assume there's a user
const initialUser = token() ? { username: null} : null

// custom provider to wrap the app
function UserProvider({ children }) {

// set the initial state to null or temp user
    const [user, setUser] = useState(initialUser)

    const navigate = useNavigate()


    const logout = () => {
        //clear the user/state
        setUser(null)

        //clear the localStorage
        localStorage.removeItem("token")

        //navigate user to login page
        navigate('/login')
    }

    useEffect(() => {

        async function getUser() {
            try {
// check if there's a token (if none, skip these steps)
                if (!token()) return
// if token exists, use token to verify the user (valid token check/expired)
                const { data } = await userClient.get('/')
// if verified, save user data to state
                setUser(data)
            }
            catch(err) {
                console.error(err)
// if verification fails, log user out
                logout()
            }
        }
        getUser()
    }, [])


    const value = {
        user,
        setUser,
        logout
    }

    return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    )
}

// custom hook to easily access context value
export function useUser() {
    return useContext(UserContext)
}

export default UserProvider
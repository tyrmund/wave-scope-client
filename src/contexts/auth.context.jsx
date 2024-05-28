import { createContext, useEffect, useState } from "react"
import authServices from "../services/auth.services"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(null)

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {

            authServices
                .verifyUser(token)
                .then(({ data }) => setLoggedUser(data))
                .catch(err => logout())
        }
    }

    const navigate = useNavigate()

    const logout = () => {

        setLoggedUser(null)
        localStorage.removeItem('authToken')
        navigate('/')
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (

        <AuthContext.Provider value={{ loggedUser, authenticateUser, logout }}>

            {props.children}

        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProviderWrapper }
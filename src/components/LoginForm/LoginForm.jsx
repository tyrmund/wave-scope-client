import { useContext, useState, useEffect } from "react"
import { Form, Button, Spinner, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth.services"
import { AuthContext } from "../../contexts/auth.context"
import Loader from "../Loader/Loader"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)


    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }



    const handleSubmit = e => {
        e.preventDefault()

        setIsLoading(true)

        authServices
            .loginUser(loginData)
            .then(({ data }) => {
                const newTokenGenerated = data.authToken
                localStorage.setItem('authToken', newTokenGenerated)
                authenticateUser()
                navigate('/welcome')
            })
            .catch(err => {
                console.log(err)
                navigate('/signup')
            })
    }


    return (

        < Form onSubmit={handleSubmit} >

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Acceder</Button>
            </div>

        </Form >

    )
}

export default LoginForm
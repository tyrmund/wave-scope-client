import { useContext, useState, useEffect } from "react"
import { Form, Button, Spinner, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth.services"
import { AuthContext } from "../../contexts/auth.context"

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
            .catch(err => console.log(err))
    }

    return (
        <div>
            {
                isLoading
                    ?
                    <Spinner animation="grow" variant="dark" />
                    :

                    <Container className="mt-6">
                        <img src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1716900017/Wave%20Scope/pixel1_m5ue4w.png" alt="Logo Wave Scope" />

                        <h1>Welcome !</h1>

                        <Form onSubmit={handleSubmit}>

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

                        </Form>
                    </Container>
            }
        </div>
    )
}

export default LoginForm
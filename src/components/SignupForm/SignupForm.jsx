import { useNavigate } from "react-router-dom"
import { useState } from "react"
import authServices from "../../services/auth.services"
import { Button, Form, Row, Col } from "react-bootstrap"

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        postalCode: '',
        country: '',
        profilePic: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleForSubmit = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))

    }

    return (

        <Form onSubmit={handleForSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={signupData.email} onChange={handleInputChange} name="email" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" value={signupData.postalCode} onChange={handleInputChange} name="postalCode" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" value={signupData.country} onChange={handleInputChange} name="country" />
                    </Form.Group>
                </Col>
            </Row>

            <Button
                className="d-block mx-auto custom-color-button mb-5 mt-3"
                type="submit">
                Create Account
            </Button>

        </Form>
    )
}

export default SignupForm
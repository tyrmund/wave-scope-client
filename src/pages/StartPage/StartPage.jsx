import { Container } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"

const StartPage = () => {

  return (

    <Container className="StartPage" >
      <Container className="d-flex justify-content-center">
        <img style={{ maxHeight: '350px', objectFit: 'cover' }} src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1716900017/Wave%20Scope/pixel1_m5ue4w.png" alt="Logo Wave Scope" />
      </Container>

      <h1>Welcome!</h1>

      <LoginForm />
    </Container>

  )
}

export default StartPage
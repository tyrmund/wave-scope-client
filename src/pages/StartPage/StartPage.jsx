import { Container } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"

const StartPage = () => {

  return (

    <div className="StartPage m-5">
      <Container className="d-flex justify-content-center">
        <img
          className="mb-5"
          style={{ maxHeight: '100px', width: 'auto' }}
          src='https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717497196/Entry-logo_mzxain.png'
          alt="Logo Wave Scope" />
      </Container>

      <h1 className="text-center mb-3">Welcome!</h1>

      <LoginForm />

    </div>

  )
}

export default StartPage
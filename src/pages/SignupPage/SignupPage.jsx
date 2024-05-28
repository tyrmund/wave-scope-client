import { Container } from "react-bootstrap"

import SignupForm from "../../components/SignupForm/SignupForm"


const SignupPage = () => {



  return (

    <Container className="signupPage">

      <h1>REGISTRO</h1>

      <SignupForm />

    </Container>
  )
}

export default SignupPage
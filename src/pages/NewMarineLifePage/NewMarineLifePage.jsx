import { Container } from "react-bootstrap"
import NewSpecimenForm from "../../components/NewSpecimenForm/NewSpecimenForm"

const NewMarineLifePage = () => {

  return (
    <Container className="NewMarineLifePage">
      <h1>Create a new specimen for our list !</h1>

      <NewSpecimenForm />
    </Container>
  )
}

export default NewMarineLifePage
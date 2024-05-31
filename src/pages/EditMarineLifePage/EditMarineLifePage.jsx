import { Container } from "react-bootstrap"
import EditSpecimenForm from "../../components/EditSpecimenForm/EditSpecimenForm"

const EditMarineLifePage = ({ commonName }) => {
  return (
    <Container className="EditMarineLifePage">
      <h1>Edit the specimen {commonName}</h1>

      <EditSpecimenForm />
    </Container>
  )
}

export default EditMarineLifePage
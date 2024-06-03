import { Container } from "react-bootstrap"
import EditSpecimenForm from "../../components/EditSpecimenForm/EditSpecimenForm"

const EditMarineLifePage = ({ commonName }) => {
  return (
    <Container className="EditMarineLifePage mt-5">
      <div className="text-center mb-5">
        <h1>Edit the specimen {commonName}</h1>
      </div>

      <EditSpecimenForm />
    </Container>
  )
}

export default EditMarineLifePage
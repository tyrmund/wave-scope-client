import { Card, Container } from "react-bootstrap"

const SpecimenCard = ({ commonName }) => {


  return (
    <Container className="SpecimenCard mt-3">

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{commonName}</Card.Title>
        </Card.Body>
      </Card>

    </Container>
  )
}

export default SpecimenCard
import { Card, Container } from "react-bootstrap"

const SpecimenCard = ({ images, commonName }) => {


  return (
    <Container className="SpecimenCard mt-3">
      <Card >
        <Card.Img variant="top" src={images[0]} />
        <Card.Body>
          <Card.Title className="text-center">{commonName}</Card.Title>
        </Card.Body>
      </Card>

    </Container>
  )
}

export default SpecimenCard
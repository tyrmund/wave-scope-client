import { Button, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const SpecimenCard = ({ images, commonName, scientificName, _id }) => {

  return (
    <Container className="SpecimenCard mt-3 mb-3">

      <Card >
        <Card.Img variant="top" src={images[0]} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="text-center mb-3 mt-3" style={{ fontSize: '33px', color: '#023047' }}>{commonName}</Card.Title>
          <Card.Subtitle className="text-center text-muted mb-3" style={{ fontSize: '20px', color: '#023047' }}>{scientificName}</Card.Subtitle>
          <Link to={`/marine-life/${_id}`}>
            <Button className="custom-color-button mt-3">More info</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SpecimenCard